import { Request, Response, NextFunction } from 'express';
import { userService } from '../module/user/user.service';
import { CustomError } from '../utils/exception';
import { HttpErrorStatus } from '../utils/util.types';
import { verify } from 'crypto';
import { verifyJwt } from '../module/auth/util/jwt.util';
export const isAuthenticated=
(req: Request,
    res: Response,
    next: NextFunction)=>{

        if(req.session.userId){
         const isUserStillExist= userService.isUserIdExist(req.session.userId)
            if(isUserStillExist){
                next();
                return;
            }
        }
        const authHeader=req.headers.authorization;
        if(authHeader){
  const jwt=authHeader.replace('Bearer ','');
  console.log("jwt",jwt);
  try{
      const payload= verifyJwt(jwt);
      //const userDoc= userService.getUserById(payload.userId);
         next();
            return;
  } catch(e){
    console.log(e,'jwt is wrong');
        }
    }
        next(new CustomError(
            'Unauthenticated access', 
            "AUTH", 
            HttpErrorStatus.Unauthorized)
        );

    }