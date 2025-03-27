import multer from "multer"
import path from "path"

// 업로드 경로와 파일명 설정
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    },
})

export const upload = multer({ storage })
