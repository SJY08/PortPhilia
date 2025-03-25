import { BrowserRouter, Route, Routes } from "react-router-dom"
import Start from "./pages/start"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Write from "./pages/write"
import View from "./pages/view"

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/write" element={<Write />} />
                <Route path="/view" element={<View />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
