import { Router } from "express"
import multer from "multer"
import path from "path"
import { getUser, updateUser } from "../controllers/userController"
import { authenticateToken } from "../middleware/authenticate"

const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    },
})
const upload = multer({ storage })

router.get("/", authenticateToken, getUser)
router.put("/", authenticateToken, upload.single("profile_image"), updateUser)

export default router
