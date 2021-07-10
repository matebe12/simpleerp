import mariadb from 'mariadb';
import { exeTransaction } from '../dbConnection';
import { arrangeForDataLoader } from '../../db/exe/common';
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

const getMenuListNotLoader = async (conn = null, req = null) => {
    const str = `SELECT * FROM toyerp.menu where PARENT_NO = '${req['MENU_NO']}'`;
    return await exeTransaction(conn, str);
};

const getMenuList = async (conn = null, req = null) => {
    try {
        let str = '';
        if (req.length > 0) {
            let PARENT_NO = [];
            req.map((v, i) => {
                PARENT_NO = [...PARENT_NO, v.PARENT_NO];
            });
            str = `
            SELECT * FROM toyerp.menu where PARENT_NO in (${req.map(
                key => `'${key['PARENT_NO']}'`
            )});
            `;
            console.log(str);
            let result = await exeTransaction(null, str);
            let arrangeResults = arrangeForDataLoader(
                PARENT_NO,
                result,
                function (item) {
                    return item['PARENT_NO'];
                }
            );
            return arrangeResults;
        } else
            str = `SELECT * FROM toyerp.menu where PARENT_NO = '${req['MENU_NO']}'`;
        return await exeTransaction(conn, str);
    } catch (error) {
        logger.error('getMenuList3: ' + error);
        throw error;
    }
};
export { getMenuList, getMenuListNotLoader };
