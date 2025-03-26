import express from "express"
import {
    getPortfolio,
    updatePortfolio,
} from "../controllers/portfolioController"
import { verifyToken } from "../middleware/authMiddleware"

const router = express.Router()

router.get("/", verifyToken, getPortfolio)
router.put("/", verifyToken, updatePortfolio)

export default router
