import { Router } from "express"
import { getUser, updateUser } from "../controllers/userController"
import { authenticateToken } from "../middleware/authenticate"

const router = Router()

router.get("/user", authenticateToken, getUser)
router.put("/user", authenticateToken, updateUser)

export default router
