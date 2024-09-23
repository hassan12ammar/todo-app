import { Exclude } from 'class-transformer'
import { IsDateString, IsNotEmpty } from 'class-validator'

export class SignupDto {
    @Exclude({ toClassOnly: true })
    id?: number

    @IsNotEmpty()
    username: string

    @Exclude({ toPlainOnly: true })
    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    firstname: string
    @IsNotEmpty()
    lastname: string

    @IsNotEmpty()
    @IsDateString()
    birthdate: string

    constructor(partial: SignupDto) {
        Object.assign(this, partial)
    }
}
