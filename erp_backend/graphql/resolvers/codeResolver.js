require('dotenv').config();
import { getPoolConnection } from '../../db/dbConnection';

import {
    getCodeList,
    getCodeOne,
    checkCodeId,
    checkCodeName,
    deleteCode,
    insertCode,
    updateCode,
} from '../../db/exe/codeExe';
import logger from '../../logger/winston';

const codeResolver = {
    Query: {
        async getCodeList(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await getCodeList(conn, req);
                return results;
            } catch (error) {
                logger.error('getCodeList: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async getCodeOne(_, req) {
            let conn = await getPoolConnection();
            console.log(req.CODE_ID);
            try {
                const results = await getCodeOne(conn, req);
                return results;
            } catch (error) {
                logger.error('getCodeOne: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
    },
    Mutation: {
        async checkCodeId(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await checkCodeId(conn, req);
                console.log(results[0].result);
                return results[0].result;
            } catch (error) {
                logger.error('checkCodeId: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async checkCodeName(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await checkCodeName(conn, req);
                console.log(results[0].result);
                return results[0].result;
            } catch (error) {
                logger.error('checkCodeName: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async deleteCode(_, req) {
            let conn = await getPoolConnection();
            try {
                const results = await deleteCode(conn, req);
                console.log(results);
                return results.affectedRows;
            } catch (error) {
                logger.error('deleteCode: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
        async insertUpdateCode(_, req) {
            let conn = await getPoolConnection();
            try {
                let results;
                if (!req.IS_UPDATE) {
                    results = await insertCode(conn, req);
                } else {
                    results = await updateCode(conn, req);
                }
                console.log(results);
                return results.affectedRows;
            } catch (error) {
                logger.error('insertUpdateCode: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
    },
};
module.exports = codeResolver;
