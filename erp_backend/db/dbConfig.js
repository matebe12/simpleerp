require("dotenv").config();


export default {connectionLimit: 50, // default 10
    acquireTimeout: 60000,   //Timeout to get a new connection from pool in ms. default 10000(10sec)
    waitForConnections: true, //default true
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    port: 3306,
    password: process.env.DB_PW,
    database: process.env.DB_NAME}