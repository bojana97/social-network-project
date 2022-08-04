import { BelongsTo, Column, DataType, DeletedAt, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { Comment } from "src/comments/comment.model";
import { PostReachableByEnum } from "./enums/post.reachable-by.enum";
import { PostTypeEnum } from "./enums/post.type.enum";
import { Reaction } from "src/reactions/reactions.model";
import { UUIDV4 } from "sequelize";

@Table
export class Post extends Model<Post>{
    /*@Column({type: DataType.INTEGER, autoIncrement:true, primaryKey: true,})
    id: number;*/

    @Column({type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true,})
    id: string;

    @Column({type: DataType.STRING,})
    title: string;

    @Column({type: DataType.STRING,})
    description: string;

    @Column({type: DataType.STRING,})
    location: string;

    @Column({type: DataType.STRING, defaultValue: PostReachableByEnum.noVehicle})
    reachableBy: PostReachableByEnum;

    @Column({type: DataType.STRING, defaultValue: PostTypeEnum.picnicArea})
    type: PostTypeEnum;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    userId: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Comment)
    comments: Comment;

    @HasMany(() => Reaction)
    reactions: Reaction;

    @DeletedAt
    deletedAt: Date;
}


