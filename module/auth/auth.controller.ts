import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { HttpErrorStatus, StringObject } from '../../utils/util.types';
import { LoginDTO, LoginResponseDTO, LoginResponseDTOWithJWT, RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { CustomError } from '../../utils/exception';
import { MODULES_NAMES } from '../../utils/constant';
import { zodValidation } from '../../utils/zod.utill';
import { loginDTOSchema, registerDTOSchema } from './util/auth.schema';
import tr from 'zod/v4/locales/tr.js';
import de from 'zod/v4/locales/de.js';
import { deleteUploadedAsset } from '../../utils/assets.utils';
import { jwt } from 'zod';
import { signJwt } from './util/jwt.util';

export class AuthController {
  private authService = new AuthService();
//    public async rgeister(req:Request<StringObject,StringObject>,
//     res:Response<RegisterResponseDTO>){
//    try {
//     const user = await this.service.register(req.body);
// return res.json(user);
// } catch (error) {
//     throw new CustomError('Something went wrong', "AUTH", 400);
//    }
// }

   public async register(
    req:Request<StringObject,RegisterDTO>,
    res:Response<RegisterResponseDTO| string>,
    next:NextFunction
  ){
      try {
    const payloadData=zodValidation(registerDTOSchema,req.body,'AUTH');
    const user = await this.authService.register(req.body);
    console.log("user",user);
     res.create(user);
    //res.json(user);
   } 
    catch (error) {
      console.log(error);
      if (req.file) {
        await deleteUploadedAsset(req.file.filename);
      }
      res.error({message:'Internal Server Error',statusCode:HttpErrorStatus.InternalServerError});
      // res.status(HttpErrorStatus.InternalServerError)
      // .send('Internal Server Error');   
    }
}

   public async login(req:Request<StringObject,StringObject,LoginDTO>,
    res:Response<LoginResponseDTO | string>){
    const payloadData=zodValidation(loginDTOSchema,req.body,'AUTH');
   
   const userData=await this.authService.login(payloadData);
   if(!userData){
    res.status(HttpErrorStatus.BadRequest).
    send("Invalid credentials");
    return ;
   } 
   console.log("session",req.session);
   //set session cookies
   req.session.userId=userData.id;
   //  express session => create new entity  { 12345: { userId:123213} } => save memory
    // express session on  response it will send the cookie with same key on session memory [abc] and sign it with my secret
   //express session will handle the cookies under the hood
  // res.json(userData);
   res.ok(userData);
  }

    public async loginWithJWT(req:Request<StringObject,StringObject,LoginDTO>,
    res:Response<LoginResponseDTOWithJWT | string>){
    const payloadData=zodValidation(loginDTOSchema,req.body,'AUTH');
   
   const userData=await this.authService.login(payloadData);
   if(!userData){
    res.status(HttpErrorStatus.BadRequest).
    send("Invalid credentials");
    return ;
   } 
const token=signJwt({sub:userData.id,name:userData.name});
   //res.json({data:userData,token});
   res.ok({user:userData,token});
  }
  //if we used cookie based authentication we should used invalidate session middleware
   public logout(req:Request,res:Response,next:NextFunction){
   // res.send("logout")
  req.session.destroy(function(err){  
    throw  new Error("Could not destroy session");
  })
}
}
export const authController=new AuthController();