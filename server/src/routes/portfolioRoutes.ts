import express from "express"
import {
    getPortfolio,
    updatePortfolio,
} from "../controllers/portfolioController"
import { upload } from "../middleware/uploadMiddleware"
import { authenticate } from "../middleware/authMiddleware"

const router = express.Router()

router.get("/", authenticate, getPortfolio)
router.put("/", authenticate, upload.single("profile_image"), updatePortfolio)

export default router
