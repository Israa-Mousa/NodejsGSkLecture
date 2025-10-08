import en from 'zod/v4/locales/en.js';
 import { User } from './user.entity';

import { prisma } from '../../services/prisma.service';
import { Prisma } from '../../src/generated/prisma';
import { ObjectId } from 'mongoose';
import { UserRepositoryI } from './interfaces/user-repo-interface';
import { UserModel } from './user.model';
export class UserMongoRepository implements UserRepositoryI {
  async findAll(page: number, limit: number) {
    const users = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalRecords = await UserModel.countDocuments().exec();
    console.log(users[0]?.toJSON({getters:true}),'server side json');
    console.log(users[0]?.toObject({getters:true}),'server side object');

    return { users, totalRecords };
  }
 findById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
 }
  findByEmail(email: string) {
    return UserModel.findOne({email }).exec();
   }
   //return this.users.find((user) => user.email === email);
 
 async create(name: string, email: string, password: string, avatar?: string):Promise<User>{
   return UserModel.create({
     name,
     email,
     password,
     avatar
   });
   // const user: Omit<User,'id'> = {

 }

 update(
   id: string,
   name?: string,
   email?: string,
   avatar?: string
 ):Promise<User | null> {
 return  UserModel.findByIdAndUpdate(id,{
     name,
     email,
     avatar
   },{new:true}).exec();

 }

 async delete(id: string): Promise<boolean> {
  const result = await UserModel.findByIdAndDelete(id);

  return Boolean(result);
}



  

}
export const userMongoRepository = new UserMongoRepository();