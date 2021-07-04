require('dotenv').config();
import db from '../../db/dbConnection';
import menuLoader from '../dataloader/menuLoader.js';
import logger from '../../logger/winston';

//const commonSql = require("../../db/dbCommonExe")

const menuResolver = {
    Query: {
        async getMenuList(_, { MENU_NO }) {
            let conn = await db.getPoolConnection();
            try {
                let req = {
                    MENU_NO,
                };
                console.log(req);
                const results = await menuLoader.getMenuLoader.load(req);
                console.log(results);
                return results;
            } catch (error) {
                logger.error('getMenuList: ' + error);
                throw error;
            } finally {
                if (conn) await db.endPoolConnection(conn);
            }
        },
    },
    MenuModel: {
        children: async parent => {
            try {
                let conn = await db.getPoolConnection();
                //console.log(`ffjfcghj ${parent['MENU_NO']}`);
                let str = `SELECT * FROM toyerp.menu where PARENT_NO = '${parent['MENU_NO']}';`;
                let result = await conn.query(str);
                console.log(result);
                return result;
            } catch (error) {
                logger.error('MenuModel: ' + error);
                throw error;
            }
        },
    },
};
module.exports = menuResolver;
