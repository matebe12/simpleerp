import mariadb from 'mariadb';
import db from '../dbConnection';
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

module.exports = {
    async getMenuList(conn = mariadb.Connection, req = null) {
        try {
            await conn.beginTransaction();
            let result = [];
            console.log(req);
            let str = `
      SELECT * FROM toyerp.menu where PARENT_NO = '${req}';
      `;
            result = await conn.query(str);
            return { result };
        } catch (error) {
            logger.error('getMenuList: ' + error);
            throw error;
        } finally {
            conn.close();
        }
    },
};
