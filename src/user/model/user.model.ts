/* eslint-disable prettier/prettier */
import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Roles } from "src/role/role.enum";

export type UserDocument=User & Document;

@Schema()
export class User{

    @Prop({unique:true,required:true})
    username:string;

    @Prop({unique:true,required:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({enum:Roles})
    role:Roles;

    @Prop({default:new Date()})
    createdAt:Date;

}

export const UserSchema=SchemaFactory.createForClass(User);