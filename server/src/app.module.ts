import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { TodoModule } from './todo/todo.module'

@Module({
    imports: [PrismaModule, AuthModule, TodoModule],
})
export class AppModule {}
