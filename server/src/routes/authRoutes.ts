import { Router } from "express"
import {
    signup,
    login,
    verifyToken,
    verifyPassword,
    changePassword,
    deleteUser,
} from "../controllers/authController"

const router = Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/verify", verifyToken)
router.post("/verifyPassword", verifyPassword)
router.post("/changePassword", changePassword)
router.delete("/delete", deleteUser)

export default router
