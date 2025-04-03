import { Router } from "express"
import {
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} from "../controllers/projectController"
import { authenticateToken } from "../middleware/authenticate"

const router = Router()

router.get("/", authenticateToken, getProjects)
router.get("/:id", authenticateToken, getProjectById)
router.put("/:id", authenticateToken, updateProject)
router.delete("/:id", authenticateToken, deleteProject)

export default router
