import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Post } from "./post.model";
import { Reaction } from "src/reactions/reactions.model";
import { User } from "src/users/user.model";
import { Comment } from "src/comments/comment.model";
import { Sequelize } from "sequelize-typescript";
import { CreatePostDto } from "./dto/create-post.dto";
import { ReactionTypeEnum } from "src/reactions/enums/reaction.type.enum";


@Injectable()
export class PostsService{
   constructor(@Inject('POSTS_REPOSITORY') private PostsRepository: typeof Post){}
    
   async createPost(createPostDto:CreatePostDto):Promise<Post>{
        return this.PostsRepository.create(createPostDto);
   }

   async findById(id:number):Promise<Post>{
      const post = await this.PostsRepository.findOne({where:{id}})

      if(!post){
        throw new NotFoundException('Post could not be found.')
      }

      return post;
   }

   //get all posts sorted by number of uvotes
   async findAll():Promise<Post[]>{

    const posts = this.PostsRepository.findAll({
        include:[{
            attributes: [],
            model: Reaction,
            where: { type: ReactionTypeEnum.UPVOTE}
        }],
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("reactions.id")), "likes"]],
        },
        group: ['Post.id'],
        order: [[Sequelize.col('likes'), 'DESC']]
    })

    return posts;

   }

   //get post by id with user details, comments, number of upvotes/downvotes
   async getPost(id:number){
        const post = await this.PostsRepository.findOne({
            include: [
                {
                    model:User, 
                    attributes: {exclude: ['password']}
                },
                {
                    model: Comment
                },
            ],        
            attributes: {
                include:[
                    [
                        Sequelize.literal(`(SELECT COUNT(id) as likes FROM "Reactions" 
                            WHERE "Reactions"."postId" = "Post"."id" and "Reactions"."type"= '${ReactionTypeEnum.UPVOTE}'
                        )`),'upvotes'
                    ], 
                    [
                        Sequelize.literal(`(SELECT COUNT(id) as likes FROM "Reactions" 
                            WHERE "Reactions"."postId" = "Post"."id" and "Reactions"."type"= '${ReactionTypeEnum.DOWNVOTE}'
                        )`), 'downvotes'
                    ]
                ]
            },
            where: {id: id},
        })

        if(!post){
            throw new NotFoundException(`Post could not be found.`)
        }
        return post;
   }



}