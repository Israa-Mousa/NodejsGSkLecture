import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { LoginDTO } from '../auth/types/auth.dto';
import { prisma } from '../../sevices/prisma.service';
import { UserRepositoryI } from './interfaces/user-repo-interface';

 class UserService {
  constructor(private userRepo: UserRepositoryI) {}

 private repository = new UserRepository();
  getUsers(page=1, limit=10):Promise< User[]> {
   return this.userRepo.findAll(page,limit);
 
  }

    getUser(id: number){
    return this.repository.findById(id);
  }
   findByEmail(email:string){
    return  this.userRepo.findByEmail(email);

  }

  public createUser(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ) {
    return this.userRepo.create(name, email, password, avatar);
  }

  updateUser(
    id: string,
    name?: string,
    email?: string,
    avatar?: string
  ) {
    return this.userRepo.update(id, name, email, avatar);
  }

  deleteUser(id: string) {
    return this.userRepo.delete(id);
  }
  isUserIdExist(id:string):boolean{
   // return this.repository.findById(id)? true:false;
   return !! this.userRepo.findById(id);
   // !! => convert any value to boolean if there is user true else false
  }

}
export const userService=new UserService();

