import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/post.model";
import { User } from "src/users/user.model";

@Table
export class Comment extends Model<Comment>{
    @Column({
        type: DataType.INTEGER, 
        autoIncrement:true, 
        primaryKey:true
    })
    id: number;

    @Column({
        type: DataType.STRING, 
        allowNull: false
    })
    comment: string;

    @ForeignKey(() => Post)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    postId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    userId: number;


}