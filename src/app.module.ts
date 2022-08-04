import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { databaseProviders } from './db/db.providers';
import { UsersModule } from './users/user.modul';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    UsersModule, 
    PostsModule, 
    CommentsModule, 
    ReactionsModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
