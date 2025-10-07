import en from 'zod/v4/locales/en.js';
 import { User } from './user.entity';

import { prisma } from '../../sevices/prisma.service';
import { Prisma } from '../../src/generated/prisma';
import { ObjectId } from 'mongoose';
import { UserRepositoryI } from './interfaces/user-repo-interface';
import { UserModel } from './user.model';
export class UserRepository implements UserRepositoryI {
  async findAll(page: number, limit: number) {
    const users = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalRecords = await UserModel.countDocuments().exec();
    return { users, totalRecords };
  }

  findById(id: number): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(name: string, email: string, password: string, avatar?: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  update(id: number, name?: string, email?: string, avatar?: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  userModel: any;

//  findAll(page=1,limit=10):Promise<User[]> {
//     return this.userModel.find().exec();
//   }
//     findById(id: ObjectId){
//     //return this.users.find((user) => user.id === id);
//     return this.userModel.findById(id).exec();
//   }

  
//   findByEmail(email: string) {
//      return this.userModel.findOne({email }).exec();
//     }
//     //return this.users.find((user) => user.email === email);
  
//   async create(name: string, email: string, password: string, avatar?: string){
//     return this.userModel.create({
//       name,
//       email,
//       password,
//       avatar: avatar || undefined
//     });
//     // const user: Omit<User,'id'> = {
//   }

//   update(
//     id: number,
//     name?: string,
//     email?: string,
//     avatar?: string
//   ) {
//   return  this.userModel.findByIdAndUpdate(id,{
//       name,
//       email,
//       avatar
//     },{new:true}).exec();

//   }

//   delete(id: ObjectId) {
//     return this.userModel.findByIdAndDelete(id).exec(); 
//   }
}
  