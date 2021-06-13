require('dotenv').config();
import db from '../../db/dbConnection';
import exe from '../../db/exe/employeeExe';
import logger from '../../logger/winston';

//const commonSql = require("../../db/dbCommonExe")

const employeeResolver = {
    Query: {
        async getEmployee(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.getEmployee(conn, req);
                const total = await exe.getEmployeeTotal(conn, req);
                //console.log(results);
                console.log(total);
                return { Employee: results, TotalCnt: total[0].TOTAL };
            } catch (error) {
                logger.error('getEmployee: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
    Mutation: {
        async checkId(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.checkId(conn, req);
                console.log(results[0].result);
                return results[0].result;
            } catch (error) {
                logger.error('checkId: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
        async insertEmployee(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.insertEmployee(conn, req);
                console.log(results);
                return results.affectedRows;
            } catch (error) {
                logger.error('insertEmployee: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
};
module.exports = employeeResolver;
