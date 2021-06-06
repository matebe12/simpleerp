const mariadb = require("mariadb");
import config from "./dbConfig";
const logger = require('../logger/winston');

const log = (msg) => logger.info(msg);

console.log(config.password);
const pool = mariadb.createPool({
    connectionLimit: config.connectionLimit,
    acquireTimeout: config.acquireTimeout,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});



module.exports = {
    exe: async function (queryStatement) {
        let conn;
        try {
            conn = await this.getPoolConnection();
            // log("connected ! connection id: " + conn.threadId + " -----");
            //logger.debug("exe queryStatement: " + queryStatement);
            const result = await pool.query(queryStatement);
            return result;

        } catch (err) {
            logger.error("exe: " + err);
            throw err;
        } finally {
            if (conn) await this.endPoolConnection(conn);
        }
    },

    exeTransaction: async function (conn, queryStatement) {
        try {

            const result = await pool.query(queryStatement);
            //logger.debug("exeTransaction queryStatement: " + queryStatement);
            // log("exeTransaction result : " + JSON.stringify(result));
            return result;
        } catch (err) {
            logger.error("exeTransaction: " + err);
            throw err;
        }
    },

    getPoolConnection: async function () {
        let conn;
        try {
            conn = await pool.getConnection();
            log("connected ! connection id: " + conn.threadId + " -----");
            return conn;
        } catch (err) {
            log("getPoolConnection not connected due to error : " + err);
            throw err;
        }
    },

    endPoolConnection: async function (conn) {
        try {
            if (conn) {
                await conn.end();
                log(
                    "exe Disconnected ! connection id: " + conn.threadId + " !!"
                );
            }
        } catch (err) {
            log("connection ending error : " + err);
            throw err;
        }
    }

};