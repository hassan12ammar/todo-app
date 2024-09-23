import { Exclude } from 'class-transformer'

export class TodoOut {
    @Exclude({ toPlainOnly: true })
    userId: number

    title: string
    description: string

    constructor(partial: TodoOut) {
        Object.assign(this, partial)
    }
}
