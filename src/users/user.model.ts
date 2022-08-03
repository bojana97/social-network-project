import { Table, Model, Column, DataType, Default, HasMany} from "sequelize-typescript";
import { Comment } from "src/comments/comment.model";
import { Post } from "src/posts/post.model";
import { Reaction } from "src/reactions/reactions.model";
import { UserRoleEnum } from "./enums/user.role.enum";
import { UserStatusEnum } from "./enums/user.status.enum";


@Table
export class User extends Model<User>{

    @Column({type: DataType.INTEGER, autoIncrement:true, primaryKey: true,})
    id: number;

    @Column({type: DataType.STRING, allowNull:false})
    firstName: string;

    @Column({type: DataType.STRING,  allowNull:false})
    lastName: string;

    @Column({type: DataType.STRING,  allowNull:false, unique: true})
    username: string;

    @Column({type: DataType.STRING,  allowNull:false})
    password: string;

    @Column({type: DataType.STRING,  allowNull:false})
    email: string;

    @Column({type: DataType.DATEONLY,  allowNull:true, })
    dateOfBirth: Date;

    @Column({type: DataType.STRING, allowNull: false})
    role: UserRoleEnum;

    @Column({type: DataType.STRING, defaultValue: UserStatusEnum.ACTIVE,})
    status: UserStatusEnum;

    /*
    @Column({type: DataType.DATE, defaultValue: timeStamp, field: 'registeredAt' })
    registeredAt: Date;  how to use created at as registered at column */

    @HasMany(() => Post)
    posts: Post[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => Reaction)
    reactions: Reaction[]

    //paranoid: true
}


