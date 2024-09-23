import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SigninPage from "./pages/signinPage.tsx"
import SiginUpPage from "./pages/signupPage.tsx"
import TodoPage from "./pages/todoPage.tsx"
import "./App.css"

const queryClient = new QueryClient()

const router = createBrowserRouter([
    { path: "/", element: <TodoPage />, errorElement: <>Error 404</> },
    {
        path: "/signin",
        element: <SigninPage />,
    },
    { path: "/signup", element: <SiginUpPage /> },
])

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
)
