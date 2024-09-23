import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import configuration from './config/configuration'
import {
    ClassSerializerInterceptor,
    Logger,
    ValidationPipe,
} from '@nestjs/common'

async function bootstrap() {
    const configs = configuration()
    const PORT = configs.port

    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    )

    app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()))

    app.enableCors({ origin: '*' })

    await app.listen(PORT)

    Logger.log(`🚀 Application is running on: http://localhost:${PORT}`)
}
bootstrap()
