// src/routes/authRoutes.ts
import express from "express"
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
} from "../controllers/authController"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/refresh-token", refreshAccessToken)
router.post("/logout", logoutUser)

export default router
