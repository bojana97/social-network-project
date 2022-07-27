import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { User } from "src/users/user.model";
import { ReactionTypeEnum } from "./enums/reaction.type.enum";

@Table
export class Reaction extends Model<Reaction>{
    @Column({
        type: DataType.INTEGER, 
        autoIncrement:true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING, 
        allowNull: false
    })
    type: ReactionTypeEnum

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    postId: number;// is belongs to needed?


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userId: number;
    
}