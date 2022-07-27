import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { databaseProviders } from './db/db.providers';
import { UsersModule } from './users/user.modul';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    AuthModule,
    UsersModule, 
    PostsModule, 
    CommentsModule, ReactionsModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})

export class AppModule {}
