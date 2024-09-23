import { useQuery } from "react-query"
import getTodossApi from "../api/getTodossApi"
import CreateTodo from "../components/createTodo"
import TodoItem from "../components/todoItem"
import { useNavigate } from "react-router-dom"

export default function TodoPage() {
    const { isLoading, data: todos } = useQuery("todos", getTodoss)
    const navigate = useNavigate()

    return (
        <div className="todo">
            <h1>Todos:</h1>

            <div className="row-container">
                {isLoading
                    ? "Loading"
                    : todos?.map((todo) => (
                          <TodoItem key={todo.id} {...todo} />
                      ))}
            </div>

            <div className="row-container">
                <div>
                    <h1>Create new Todos</h1>
                    <CreateTodo />
                </div>

                <div className="separator"></div>

                <div>
                    <h1>Signout</h1>
                    <button
                        onClick={() => {
                            sessionStorage.removeItem("token")
                            navigate("/signin")
                        }}
                    >
                        Signout
                    </button>
                </div>
            </div>
        </div>
    )

    async function getTodoss() {
        try {
            return await getTodossApi()
        } catch {
            navigate("/signin")
        }
    }
}
