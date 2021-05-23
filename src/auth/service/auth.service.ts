/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService,
        private userService:UserService){}

    //validate user
    async validateUser(email:string,password:string):Promise<any>{
        try{
            const user=await this.userService.getUserByEmail(email);
            if(compareSync(password,user?.password)){
                return user;
            }
            return null;
        }catch(error){
            Logger.log(error);
            throw error;
        }
   }


   //signin
   async login(user){
       const payload={sub:user.id,user};

       return {
           userId:user.id,
           accesssToken:this.jwtService.sign(payload)
       };
   }
        
   //validate token
   validateToken(jwt:string){
       return this.jwtService.verify(jwt);
   }

   
   

}