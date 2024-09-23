import { useQueryClient, useMutation } from "react-query"
import createTodoApi from "../api/createTodoApi"
import { useState } from "react"

export interface ICreateTodoProps {
    title: string
    description: string
}

const defaultTodo: ICreateTodoProps = {
    description: "description",
    title: "title",
}

export default function CreateTodo() {
    const [todo, setTodo] = useState<ICreateTodoProps>(defaultTodo)

    const queryClient = useQueryClient()
    const { mutate: createTodo } = useMutation(
        (newTodo: ICreateTodoProps) => createTodoApi(newTodo),
        {
            onSettled: () => {
                queryClient.invalidateQueries("todos")
            },
        }
    )

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                createTodo(todo)
                setTodo(defaultTodo)
            }}
        >
            <input
                value={todo.title}
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                type="text"
            />
            <br />
            <br />
            <textarea
                onChange={(e) =>
                    setTodo({ ...todo, description: e.target.value })
                }
                value={todo.description}
            ></textarea>
            <br />
            <button type="submit">Create</button>
        </form>
    )
}
