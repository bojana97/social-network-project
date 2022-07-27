import { User } from "./user.model";

export const UsersRepository = [{
    provide: 'USERS_REPOSITORY', 
    useValue: User
}]