import axios from "axios"
import { BASE_URL, token } from "../util/constant"

export default async (id: number) => {
    await axios
        .delete(`${BASE_URL}/todo/${id}`, {
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
}
