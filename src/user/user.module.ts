/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//mport { RolesGuard } from 'src/role/role.guard';
import { UserService } from 'src/user/service/user.service';
import { User, UserSchema } from './model/user.model';

@Module({
    imports:[
        MongooseModule.forFeature([{
        name:User.name,
        schema:UserSchema
    }])],
    providers: [UserService],
    controllers: [],
    exports:[UserService]
})
export class UserModule {}

