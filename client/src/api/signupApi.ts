import axios from "axios"
import { BASE_URL } from "../util/constant"

export default async (dto: sigupResuestType) => {
    const response = await axios
        .post(`${BASE_URL}/auth/signup`, dto)
        .catch((error) => {
            if (error instanceof axios.AxiosError) {
                alert(error.message)
            }
            throw error
        })

    return response.data
}

export type sigupResuestType = {
    username: string
    password: string

    firstname: string
    lastname: string
    birthdate: string
}
