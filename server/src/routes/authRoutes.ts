import { Router } from "express"
import {
    signup,
    login,
    verifyToken,
    verifyPassword,
} from "../controllers/authController"

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/verify", verifyToken)
router.post("/verifyPassword", verifyPassword)

export default router
