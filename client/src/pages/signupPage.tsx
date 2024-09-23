import { useState } from "react"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import signupApi, { sigupResuestType } from "../api/signupApi"

const defaultValues: sigupResuestType = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    birthdate: "",
}

// TODO 
export default function SiginUpPage() {
    const [values, setValues] = useState<sigupResuestType>(defaultValues)
    const navigate = useNavigate()

    const { mutate: signup } = useMutation(
        async () => {
            const response = await signupApi(values)
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
        <div className="main">
            <h1>Signup</h1>

            <form
                className="column-container"
                onSubmit={(e) => {
                    e.preventDefault()
                    signup()
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
                <div className="row-container">
                    <p>firstname:</p>
                    <input
                        value={values.firstname}
                        type="text"
                        onChange={(e) =>
                            setValues({ ...values, firstname: e.target.value })
                        }
                    />
                </div>
                <div className="row-container">
                    <p>lastname:</p>
                    <input
                        value={values.lastname}
                        type="text"
                        onChange={(e) =>
                            setValues({ ...values, lastname: e.target.value })
                        }
                    />
                </div>
                <div className="row-container">
                    <p>birthdate:</p>
                    <input
                        value={values.birthdate}
                        type="date"
                        onChange={(e) =>
                            setValues({ ...values, birthdate: e.target.value })
                        }
                    />
                </div>
                <br />

                <button type="submit">Signup</button>
            </form>

            <button className="cta" onClick={() => navigate("/signin")}>
                Let's Signin
            </button>
        </div>
    )
}
