import { Post } from "./post.model";

export const PostsRepository = {
    provide: 'POSTS_REPOSITORY',
   useValue: Post
}