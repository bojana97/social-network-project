import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsService } from 'src/posts/posts.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsService, PostsRepository ],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [CommentsRepository],
})
export class CommentsModule {}
