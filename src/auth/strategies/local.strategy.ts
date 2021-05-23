/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local'){

    constructor(private authService:AuthService){
        super({usernameField:'email'}); //passport searches for username
    }

    async validate(email:string,password:string):Promise<any>{
        const user=await this.authService.validateUser(email,password);

        if(!user){
            throw new UnauthorizedException('user cannot validate');
        }

        return user;
    }
}