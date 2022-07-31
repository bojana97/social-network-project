import { Comment } from "./comment.model"

export const CommentsRepository = {
    provide: 'COMMENTS_REPOSITORY',
    useValue: Comment
}

