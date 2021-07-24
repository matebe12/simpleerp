require('dotenv').config();
import { getPoolConnection } from '../../db/dbConnection';
import {
    getEmployee,
    getEmployeeTotal,
    getEmployeeOne,
    insertEmployee,
    updateEmployee,
    checkId,
} from '../../db/exe/employeeExe';
import logger from '../../logger/winston';

//const commonSql = require("../../db/dbCommonExe")

const employeeResolver = {
    Query: {
        async getEmployee(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await getEmployee(conn, req);
                const total = await getEmployeeTotal(conn, req);
                return { Employee: results, TotalCnt: total[0].TOTAL };
            } catch (error) {
                logger.error('getEmployee: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async getEmployeeOne(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await getEmployeeOne(conn, req);
                return results;
            } catch (error) {
                logger.error('getEmployeeOne: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
    },
    Mutation: {
        async checkId(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await checkId(conn, req);
                return results[0].result;
            } catch (error) {
                logger.error('checkId: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async insertUpdateEmployee(_, req) {
            let conn = await getPoolConnection();
            try {
                let results;
                if (!req.IS_UPDATE) {
                    results = await insertEmployee(conn, req);
                } else {
                    results = await updateEmployee(conn, req);
                }
                return results.affectedRows;
            } catch (error) {
                logger.error('insertUpdateEmployee: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
    },
};
module.exports = employeeResolver;
