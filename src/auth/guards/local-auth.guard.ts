/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local'){
    //before a requests hits the route handler function , nest will pass the request through
    //a pipeline of Guard which have the responsibility of
    //validating the request and throwing an error if anything goes wrong.

    //in this case In this case, the AuthGuard will extract he
    // user’s credentials from the request and then pass it to an instance 
    //of the LocalStrategy class. If the credentials are correct, it will 
    //add a user item to the Request object with whatever is returned from the
    // validate method, otherwise it will throw the UnauthorizedException 
    //which will be dealt with further down the stack.
}