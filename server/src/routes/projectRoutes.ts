import { Router } from "express"
import {
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    addProject,
} from "../controllers/projectController"
import { authenticateToken } from "../middleware/authenticate"

const router = Router()

router.get("/", authenticateToken, getProjects)
router.post("/", authenticateToken, addProject)
router.get("/:id", authenticateToken, getProjectById)
router.put("/:id", authenticateToken, updateProject)
router.delete("/:id", authenticateToken, deleteProject)

export default router
