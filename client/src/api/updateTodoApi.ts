import axios from "axios"
import { BASE_URL, token } from "../util/constant"
import { TodoType } from "../todo"

export default async (todo: UpdateTodo): Promise<TodoType> => {
    const response = await axios
        .patch(`${BASE_URL}/todo/${todo.id}`, todo, {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        })
        .catch((error) => {
            if (error instanceof axios.AxiosError) {
                alert(error.message)
            }
            throw error
        })

    return response.data
}

class UpdateTodo {
    id!: number
    title?: string
    description?: string
    completed?: boolean
}
