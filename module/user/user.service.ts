import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { LoginDTO } from '../auth/types/auth.dto';
import { prisma } from '../../sevices/prisma.service';

 class UserService {
 private repository = new UserRepository();
  getUsers(page: number, limit: number):Promise< User[]> {
   return this.repository.findAll({});
 
  }

    getUser(id: number){
    return this.repository.findById(id);
  }
   findByEmail(email:string){
    return  this.repository.findByEmail(email);

  }

  public createUser(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ) {
    return this.repository.create(name, email, password, avatar);
  }

  updateUser(
    id: number,
    name?: string,
    email?: string,
    avatar?: string
  ) {
    return this.repository.update(id, name, email, avatar);
  }

  deleteUser(id: number) {
    return this.repository.delete(id);
  }
  isUserIdExist(id:number):boolean{
   // return this.repository.findById(id)? true:false;
   return !! this.repository.findById(id);
   // !! => convert any value to boolean if there is user true else false
  }

}
export const userService=new UserService();

