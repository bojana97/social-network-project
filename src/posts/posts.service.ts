import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Post } from "./post.model";
import { Reaction } from "src/reactions/reactions.model";
import { User } from "src/users/user.model";
import { Comment } from "src/comments/comment.model";
import { Sequelize } from "sequelize-typescript";
import { CreatePostDto } from "./dto/create-post.dto";
import { ReactionTypeEnum } from "src/reactions/enums/reaction.type.enum";
import { AuthDTO } from "src/auth/dto/auth.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService{
   constructor(@Inject('POSTS_REPOSITORY') private PostsRepository: typeof Post){}
    
   async createPost(createPostDto:CreatePostDto):Promise<Post>{
        return this.PostsRepository.create(createPostDto);
   }

   async findById(id:string):Promise<Post>{
      const post = await this.PostsRepository.findOne({where:{id}})

      if(!post){
        throw new NotFoundException('Post could not be found.')
      }

      return post;
   }

   //get all posts sorted by number of uvotes
   async findAll():Promise<Post[]>{

    const sortedPosts = await this.PostsRepository.findAll({
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
    
    if(sortedPosts.length < 1){
        return await this.PostsRepository.findAll();
    }

    return sortedPosts;

   }

   //get post by id with user details, comments, number of upvotes/downvotes
   async getPost(id:string){
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

   async deletePost(id:string, user:AuthDTO){
        const post = await this.PostsRepository.findOne({where: {id:id, userId: user.userId}});

        if(!post){
            throw new UnauthorizedException('Post could not be found.')        
        }
        return post.destroy();
   }

   async update(){

   }

   async updatePost(id:string, updatePostDto:UpdatePostDto, user:AuthDTO){

    const updatedRows = await this.PostsRepository.update({
        title: updatePostDto.title,
        description: updatePostDto.description,
        location: updatePostDto.location,
        reachableBy: updatePostDto.reachableBy,
        type: updatePostDto.type
    },{
        where: {id:id, userId: user.userId}
    })

    if(updatedRows[0] < 1){
        throw new NotFoundException('Post could not be found')
    }
    
    const updatedPost = await this.PostsRepository.findOne({
        where: {id:id, userId: user.userId}
    })

    return updatedPost;
  }

}