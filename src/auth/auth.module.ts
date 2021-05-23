/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule} from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';



@Module({
  imports:[
    UserModule,
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'3600s'}
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  
})
export class AuthModule {}
