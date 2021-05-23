/* eslint-disable prettier/prettier */

import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class ResetPassword{
    @Prop()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(255)
    password:string

    @Prop({default:new Date()})
    createAt?:Date;    
}