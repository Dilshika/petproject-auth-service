/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./role.enum";


export class RolesGuard implements CanActivate{

    constructor(private reflector:Reflector){}

    canActivate(context:ExecutionContext):boolean{
        const roles=this.reflector.get<Roles[]>('roles',
           context.getHandler());

        if(!roles){
            return true;
        }

        const {user}=context.switchToHttp().getRequest();
        return user && roles.some((role)=>user.roles?.includes(role));
    }
}