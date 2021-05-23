/* eslint-disable prettier/prettier */
import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SigninDto{

    @Prop()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Prop()
    @IsNotEmpty()
    @IsString()
    password:string;

}