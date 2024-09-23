import { Module } from '@nestjs/common'
import { SigninController } from './signin/signin.controller'
import { SigninService } from './signin/signin.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { SignupController } from './signup/signup.controller'
import { SignupService } from './signup/signup.service'
import { JwtModule } from '@nestjs/jwt'
import { GetUserController } from './get-user/get-user.controller'
import configuration from 'src/config/configuration'
import { GetUserService } from './get-user/get-user.service'

const configs = configuration()
@Module({
    imports: [
        JwtModule.register({
            secret: configs.secret,
            global: true,
            signOptions: { expiresIn: configs.secretExpire },
        }),
    ],
    controllers: [SigninController, SignupController, GetUserController],
    providers: [PrismaService, SigninService, SignupService, GetUserService],
})
export class AuthModule {}
