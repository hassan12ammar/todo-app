import { useState } from "react"
import { useMutation } from "react-query"
import { siginResuestType, SigninApi } from "../api/signinApi"
import { useNavigate } from "react-router-dom"

export interface ISigninFormProps {}

const defaultValues: siginResuestType = {
    username: "",
    password: "",
}

export default function SigninForm() {
    const [values, setValues] = useState<siginResuestType>(defaultValues)
    const navigate = useNavigate()

    const { mutate: sigin } = useMutation(
        async () => {
            const response = await SigninApi(values)
            sessionStorage.setItem("token", response.token)
            console.log(response)

            navigate("/")
        },
        {
            onSuccess: () => {
                setValues(defaultValues)
            },
        }
    )

    return (
        <div className="column-container">
            <h1>Signin</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault()  
                    sigin()
                }}
            >
                <div className="row-container">
                    <p>Username:</p>
                    <input
                        value={values.username}
                        type="text"
                        onChange={(e) =>
                            setValues({ ...values, username: e.target.value })
                        }
                    />
                </div>
                <div className="row-container">
                    <p>password:</p>
                    <input
                        value={values.password}
                        type="password"
                        onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                        }
                    />
                </div>
                <br />

                <button className="cta" type="submit">
                    Signin
                </button>
            </form>

            <button onClick={() => navigate("/signup")}>let's Signup</button>
        </div>
    )
}
