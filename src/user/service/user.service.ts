/* eslint-disable prettier/prettier */
import {  BadRequestException, Injectable,Logger,NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserDocument } from '../model/user.model';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

    constructor(
    @InjectModel(User.name) private userModel:Model<UserDocument>,
    ){}
    
    
    //create user
    async create(createUser:CreateUserDto):Promise<User|undefined>{
        const user=new this.userModel(createUser);
        const isUnique= await this.isUserUnique(user.email,user.username);
        if(!isUnique){
            user.password=await bcrypt.hash(createUser.password,8);
            Logger.log('Successfuly Created');
            return user.save();   
        }else {
            Logger.log('Error')
            throw new NotAcceptableException('User Already Exists');
        }
        
        
    }

    //get user by Username
    async getByUsername(username:string):Promise<User|null>{
        const user=this.userModel.findOne({username:username});
        if(user){
            return user;
        }
        return null;
    }


    //get user by email
    async getUserByEmail(email:string):Promise<User|null>{
        const user= this.userModel.findOne({email:email});
        if(user){
            return user;
        }
        return null;
    }

    

    //check if user is unique
    async isUserUnique(email:string,username:string):Promise<boolean>{
        const existName=this.getByUsername(username);
        if(!existName){
            const existEmail=this.getUserByEmail(email);
                if(!existEmail){
                    return true;
                }
                return false;
        }
        return false;
    }
    

    //get user by id
    async getById(id:string):Promise<User|null>{
        if(!id){
            throw new BadRequestException('id Not Given');
        }
        const user=await this.userModel.findById(id);
        if(!user){
            return null;
        }
        return user;
    }
}



