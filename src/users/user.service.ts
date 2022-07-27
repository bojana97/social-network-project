import { Injectable, Inject, NotFoundException, HttpException, UnauthorizedException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.model";
import { UserStatusEnum } from "./enums/user.status.enum";
import { UserRoleEnum } from "./enums/user.role.enum";
import { GetUser } from "./decorators/get-user.decorator";
import { GetUsersFilterDto } from "./dto/get-users-filter.dto";


@Injectable()
export class UserService {
  constructor(
        @Inject('USERS_REPOSITORY')
        private UsersRepository: typeof User   
    ){}

    async create(user: CreateUserDto): Promise<User> {
        const foundUser = await this.UsersRepository.findOne({'where': {username: user.username}})        
        if(foundUser){
            throw new HttpException('Username already exists.', 409) //https://stackoverflow.com/questions/3825990/http-response-code-for-post-when-resource-already-exists
        }

        return this.UsersRepository.create<User>(user);
    }

    async findOneByUsername(username: string): Promise<User> {
        return await this.UsersRepository.findOne({ where: { username } });
    }

    async findOneById(id: number): Promise<User> {
        return await this.UsersRepository.findOne<User>({ where: { id } });
    }

    async getAllUsers():Promise<User[]>{
        return await this.UsersRepository.findAll({order: [['createdAt', 'DESC']]});
    }

    async getUsersWithFilter(filterDto: GetUsersFilterDto):Promise<User[]>{
        const {status, type} = filterDto;
        let users =  await this.getAllUsers();
        
        if(status){
            users = users.filter(user => user.status === status)
        }

        if(type){
            users = users.filter(user => user.role === type)
        }

        return users;   
    }

    async deactivateUser(id:number):Promise<User>{
        const user = await this.findOneById(id);
        
        if(!user){ 
            throw new NotFoundException(`User with ID '${id}' is not found!`);
        }
         
        //learn how to correctly handle exceptions -> in service or controller

        if(user.role === UserRoleEnum.ADMIN){
            throw new UnauthorizedException(`Administrator account cannot be deactivated!`)
        }

        //should message be sent if user is already deactivated??

        user.status = UserStatusEnum.INACTIVE;
        user.save();

        return user;
    }
    





}