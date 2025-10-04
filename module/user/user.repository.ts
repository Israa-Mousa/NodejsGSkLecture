import en from 'zod/v4/locales/en.js';
 import { User } from './user.entity';

import { prisma } from '../../sevices/prisma.service';
import { Prisma } from '../../src/generated/prisma';
export class UserRepository {
  private users: User[]=[];
  // private idCounter = 1;
  //USER REP INTERFCE 
   private prismaUser=prisma.user;
//  constructor(users:User[]=userData) {
//    this.users=users;}

  // findAll(): User[] {
  //   return this.prismaUser.findMany();
  // }
 
  //  findAll(): Promise <User[] >{
  //   return this.prismaUser.findMany();
  // }
  findAll(query: Prisma.UserFindManyArgs['where']) {
    return this.prismaUser.findMany({
      where: query
    });
  }
    findById(id: number){
    //return this.users.find((user) => user.id === id);
    return this.prismaUser.findUniqueOrThrow({
      where:{id}
    })
  }

  
  findByEmail(email: string) {
     return this.prismaUser.findUnique({
      where:{
        email
      }
    })
    //return this.users.find((user) => user.email === email);
  }
  create(name: string, email: string, password: string, avatar?: string){
    const user: Omit<User,'id'> = {
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      password,
         avatar: avatar || null
    };
   return this.prismaUser.create({data:user})
    // if (avatar) {
    //   user.avatar = avatar;
    // }

    // this.idCounter++;
    // this.users.push(user);
   // return user;
  }

  update(
    id: number,
    name?: string,
    email?: string,
    avatar?: string
  ) {
  return  this.prismaUser.update({
      where:{id},
      data:{
        name,
        email,
        avatar
      }
    })
  
  }

  delete(id: number) {
   return this.prismaUser.delete({
      where:{id:Number(id)}
    })
   
  }
}
