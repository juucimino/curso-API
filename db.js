const mysql = require("mysql2/promise")

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
})