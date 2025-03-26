import mysql from "mysql2/promise"

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "tjwlgh828***", // 본인의 DB 비밀번호로 수정
    database: "portphilia",
})
