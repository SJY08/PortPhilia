import { BrowserRouter, Route, Routes } from "react-router-dom"
import Start from "./pages/start"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Write from "./pages/write"

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/write" element={<Write />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
