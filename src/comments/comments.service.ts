import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
    constructor(@Inject('COMMENTS_REPOSITORY') private commentsRepository: typeof Comment){}
}
