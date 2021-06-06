import mariadb from 'mariadb';
import db from '../dbConnection';
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

module.exports = {
    async getEmployee(conn = mariadb.Connection) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `
            SELECT USER_ID,USER_NM,USER_EMAIL,USER_BIRTH,USER_ADDRESS,USE_YN,CREATED_NO,DATE_FORMAT(CREATED_DT, "%Y %c/%e %r") AS CREATED_DT FROM toyerp.employee ;
            `;
            result = await conn.query(str);
            console.log(result);
            return result;
        } catch (error) {
            logger.error('getEmployee: ' + error);
            throw error;
        } finally {
        }
    },
};
