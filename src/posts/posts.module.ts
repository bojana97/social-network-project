import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService, 
    PostsRepository
  ],
  exports: [PostsRepository],
})

export class PostsModule {}