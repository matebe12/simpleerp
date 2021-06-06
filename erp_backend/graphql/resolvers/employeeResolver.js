require('dotenv').config();
import db from '../../db/dbConnection';
import exe from '../../db/exe/employeeExe';
import logger from '../../logger/winston';

//const commonSql = require("../../db/dbCommonExe")

const employeeResolver = {
    Query: {
        async getEmployee(_) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.getEmployee(conn);
                console.log(results);
                return results;
            } catch (error) {
                logger.error('getEmployee: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
};
module.exports = employeeResolver;
