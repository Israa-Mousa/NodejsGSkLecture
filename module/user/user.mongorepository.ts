import en from 'zod/v4/locales/en.js';
 import { User } from './user.entity';

import { prisma } from '../../sevices/prisma.service';
import { Prisma } from '../../src/generated/prisma';
import { ObjectId } from 'mongoose';
export class UserRepository {
  userModel: any;

 findAll(page=1,limit=10):Promise<User[]> {
    return this.userModel.find().exec();
  }
    findById(id: ObjectId){
    //return this.users.find((user) => user.id === id);
    return this.userModel.findById(id).exec();
  }

  
  findByEmail(email: string) {
     return this.userModel.findOne({email }).exec();
    }
    //return this.users.find((user) => user.email === email);
  
  async create(name: string, email: string, password: string, avatar?: string){
    return this.userModel.create({
      name,
      email,
      password,
      avatar: avatar || undefined
    });
    // const user: Omit<User,'id'> = {
  }

  update(
    id: number,
    name?: string,
    email?: string,
    avatar?: string
  ) {
  return  this.userModel.findByIdAndUpdate(id,{
      name,
      email,
      avatar
    },{new:true}).exec();

  }

  delete(id: ObjectId) {
    return this.userModel.findByIdAndDelete(id).exec(); 
  }
}
  