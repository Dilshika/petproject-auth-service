/* eslint-disable prettier/prettier */
import { Prop } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Roles } from "src/role/role.enum";

export class CreateUserDto{

    @Prop({type:mongoose.Schema.Types.ObjectId})
    id?:string;

    @Prop()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(255)
    username:string;

    @Prop()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Prop()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    password:string;

    @Prop({enum:Roles})
    role:Roles;

    @Prop({default:new Date()})
    createdAt!:Date;
}