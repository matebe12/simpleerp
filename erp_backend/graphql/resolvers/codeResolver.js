require('dotenv').config();
import db from '../../db/dbConnection';
import exe from '../../db/exe/codeExe';
import logger from '../../logger/winston';

const codeResolver = {
    Query: {
        async getCodeList(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.getCodeList(conn, req);
                return results;
            } catch (error) {
                logger.error('getCodeList: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
        async getCodeOne(_, req) {
            let conn = await db.getPoolConnection();
            console.log(req.CODE_ID);
            try {
                const results = await exe.getCodeOne(conn, req);
                return results;
            } catch (error) {
                logger.error('getCodeOne: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
    Mutation: {
        async checkCodeId(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.checkCodeId(conn, req);
                console.log(results[0].result);
                return results[0].result;
            } catch (error) {
                logger.error('checkCodeId: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
        async checkCodeName(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.checkCodeName(conn, req);
                console.log(results[0].result);
                return results[0].result;
            } catch (error) {
                logger.error('checkCodeName: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
        async deleteCode(_, req) {
            let conn = await db.getPoolConnection();
            try {
                const results = await exe.deleteCode(conn, req);
                console.log(results);
                return results.affectedRows;
            } catch (error) {
                logger.error('deleteCode: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
        async insertUpdateCode(_, req) {
            let conn = await db.getPoolConnection();
            try {
                let results;
                if (!req.IS_UPDATE) {
                    results = await exe.insertCode(conn, req);
                } else {
                    results = await exe.updateCode(conn, req);
                }
                console.log(results);
                return results.affectedRows;
            } catch (error) {
                logger.error('insertUpdateCode: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
};
module.exports = codeResolver;
