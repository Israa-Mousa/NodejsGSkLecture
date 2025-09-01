import { LoginDTO, LoginResponseDTO, RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { createArgonHash, verifyArgonHash } from './util/argon.utils';
import { removeFields } from '../../utils/object.util';
import { userService } from '../user/user.service';

export class AuthService {
  private _userService = userService;
 public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this._userService.createUser(
      payload.name,
      payload.email,
      hashedValue,
      payload.avatar
    );

    return removeFields(userData, ['password']);
  }

  public async login(payload:LoginDTO):Promise<LoginResponseDTO | null>{
    // find the user by email
    const foundUser=this._userService.findByEmail(payload.email);
    //if user not found throw error
    if(!foundUser){
return null; 
   }
    //compare the password
    const isPasswordMatch= await verifyArgonHash(payload.password,foundUser.password);
    if(!isPasswordMatch){
      return null;
    }
    // return user data without password
    return removeFields(foundUser,['password']);
  }
}

