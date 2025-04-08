import { Router } from "express"
import { signup, login } from "../controllers/authController"

const router = Router()

router.post("/auth/signup", signup)
router.post("/auth/login", login)

export default router
