import express from "express"
import {
    addProject,
    updateProject,
    deleteProject,
} from "../controllers/projectController"
import { verifyToken } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/", verifyToken, addProject)
router.put("/:id", verifyToken, updateProject)
router.delete("/:id", verifyToken, deleteProject)

export default router
