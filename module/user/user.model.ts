import mongoose from "mongoose";
import { User } from "./user.entity";

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    password: {
      type: String,
      validate: {
        validator: function (passwordValue: string) {
          return passwordValue.length >= 6;
        },
        message: 'Password should be at least 6 characters long'
      }
    },
    
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
    // posts:[{type:mongoose.Schema.Types.ObjectId,ref:'Post'}]
  } ,{ timestamps: true,versionKey:false
    // ,toJSON:schemaToJsonDefaultOption
  }
 
);

export const UserModel = mongoose.model<User>('User', userSchema);