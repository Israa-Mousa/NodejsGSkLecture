import { object } from "zod";
import { extend } from "zod/mini";
import { UnifiedApiErrorResponse } from "../middlewares/response.middleware";

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

// declare global {
//   interface Array<T>{
//     toObservable(): string; 
//   }
// }
// Array.prototype.toObservable = ()=> 'Observable';

export type MyEnvs={
     PORT:number;
    NODE_ENV:'development' | 'production' | 'test';
    SESSION_SECRET:string;
    JWT_SECRET:string;
}

declare global{

namespace NodeJS{
  interface ProcessEnv extends MyEnvs{
 
  }
}
namespace Express {
 interface Response{
  create:(data:object)=>this ,
  ok:(data:object)=>this ,
error:(data:UnifiedApiErrorResponse)=>this;
}
}
}

