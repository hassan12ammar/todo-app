import axios from "axios"
import { BASE_URL } from "../util/constant"

export async function SigninApi(dto: siginResuestType) {
    const response = await axios
        .post(`${BASE_URL}/auth/signin`, {
            ...dto,
        })
        .catch((error) => {
            if (error instanceof axios.AxiosError) {
                alert(error.message)
            }
            throw error
        })

    return response.data as AuthOut
}

export type siginResuestType = {
    username: string
    password: string
}

class AuthOut {
    token!: string
}
