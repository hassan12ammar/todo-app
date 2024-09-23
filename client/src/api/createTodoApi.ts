import axios, { isAxiosError } from "axios"
import { ICreateTodoProps } from "../components/createTodo"
import { BASE_URL, token } from "../util/constant"

export default async (todo: ICreateTodoProps) => {
    const response = await axios
        .post(`${BASE_URL}/todo`, todo, {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        })
        .catch((error) => {
            if (isAxiosError(error)) {
                console.log(error.response?.data)

                alert(JSON.stringify(error.response?.data))
            }

            throw error
        })

    return response.data
}
