import { Sequelize } from "sequelize-typescript";
import { User } from "src/users/user.model";
import {Post} from "src/posts/post.model"
import { Comment } from "src/comments/comment.model";
import { Reaction } from "src/reactions/reactions.model";

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async () => {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'social-network-db',
        });
        sequelize.addModels([Post, User,Comment, Reaction]);
        await sequelize.sync();
        return sequelize;
      },
    },
  ];