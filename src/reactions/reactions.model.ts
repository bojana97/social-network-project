import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
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
        primaryKey: true
    })
    postId: number;// is belongsTo needed?

    @BelongsTo(() => User)
    user: User;


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        primaryKey: true
    })
    userId: number;

    @BelongsTo(() => Post)
    post: Post;
}