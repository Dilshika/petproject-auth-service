/* eslint-disable prettier/prettier */
import {  Controller,Request,Post, UseGuards, Logger, Body, Get} from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/model/user.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')

export class AuthController {

    constructor(private authService:AuthService,private readonly userService:UserService){}


    //user registration
    @EventPattern('user_created')
    @Post('signup')
    async registerUser(@Body() userBody:CreateUserDto){
        try{
            return  this.userService.create(userBody);
        }
        catch(error){
            console.log(error);
            throw error;

        }
    }

    //login user
    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async login(@Body() req){
        return this.authService.login(req);
    }

    //get user by email
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async getUser(@Request() request){
        const {id,email,username}=request.user.properties;
        return {id,email,username};
    }



    //check for the authentication
    @MessagePattern({role:'auth',cmd:'check'})
    async loggedIn(data){
        try{
            const res=this.authService.validateToken(data.jwt);
            return res;
        }catch(error){
            Logger.log(error);
            return false;
        }
    }

    @MessagePattern({role:'user',cmd:'get'})
    getUSer(data:string):Promise<User>{
        return this.userService.getUserByEmail(data);
    }


}
