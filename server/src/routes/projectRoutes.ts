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

router.get("/projects", authenticateToken, getProjects)
router.post("/projects", authenticateToken, addProject)
router.get("/projects/:id", authenticateToken, getProjectById)
router.put("/projects/:id", authenticateToken, updateProject)
router.delete("/projects/:id", authenticateToken, deleteProject)

export default router
