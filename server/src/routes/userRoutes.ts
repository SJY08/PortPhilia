import { Router } from "express"
import { getUser, updateUser } from "../controllers/userController"
import { authenticateToken } from "../middleware/authenticate"

const router = Router()

router.get("/", authenticateToken, getUser)
router.put("/", authenticateToken, updateUser)

export default router
