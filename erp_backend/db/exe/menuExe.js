import mariadb from 'mariadb';
import { exeTransaction } from '../dbConnection';
import { BatchingItem } from '../../db/exe/common';
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

const getMenuListNotLoader = async (conn = null, req = null) => {
    const str = `SELECT * FROM toyerp.menu where PARENT_NO = '${req['MENU_NO']}'`;
    return await exeTransaction(conn, str);
};

const getMenuList = async (conn = null, PARENT_NO) => {
    try {
        console.log(PARENT_NO);
        let str = '';
        if (PARENT_NO.length > 0) {
            str = `
            SELECT * FROM toyerp.menu where PARENT_NO in (${PARENT_NO.map(
                key => `'${key}'`
            )});
            `;
            let result = await exeTransaction(null, str);
            const batchingData = BatchingItem(
                PARENT_NO,
                result,
                item => item['PARENT_NO']
            );
            return PARENT_NO.map(id => batchingData[id]);
        } else
            str = `SELECT * FROM toyerp.menu where PARENT_NO = '${PARENT_NO['MENU_NO']}'`;
        return await exeTransaction(conn, str);
    } catch (error) {
        logger.error('getMenuList3: ' + error);
        throw error;
    }
};
export { getMenuList, getMenuListNotLoader };
