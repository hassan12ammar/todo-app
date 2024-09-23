import axios from "axios"
import { BASE_URL, token } from "../util/constant"
import { TodoType } from "../todo"

export default async (): Promise<TodoType[]> => {
    const response = await axios.get(`${BASE_URL}/todo`, {
        headers: {
            Authorization: `Bearer ${token()}`,
        },
    })

    return response.data
}
