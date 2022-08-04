import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PostsRepository } from 'src/posts/posts.repository';
import { PostsService } from 'src/posts/posts.service';
import { ReactionsController } from './reactions.controller';
import { ReactionsRepository } from './reactions.repository';
import { ReactionsService } from './reactions.service';

@Module({
  controllers: [ReactionsController],
  providers: [
    ReactionsService, 
    ReactionsRepository,
    PostsService, 
    PostsRepository
  ]
})

export class ReactionsModule {}
