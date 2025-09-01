import { NextFunction,Request,Response } from "express";
//import { multerUpload } from "../../../config/multer.config";
// Ensure the correct path and file extension for multer.config
//
import { multerUpload } from "../config/multer.config";
import { MulterError } from "multer";

export const multerGlobalMiddleware = (
    req:Request, 
    res:Response,
     next:NextFunction) => {
        try {
          multerUpload.none()(req,res,next);//middleware function
        } catch (error) {
          if (error instanceof MulterError) {
            error.code==='LIMIT_UNEXPECTED_FILE';
            next();
          }
         next(error);
     }
    } 

