require('dotenv').config();
import { getPoolConnection } from '../../db/dbConnection';
import { getMenuLoader } from '../dataloader/menuLoader.js';
import { getMenuList } from '../../db/exe/menuExe';
import logger from '../../logger/winston';
const menuResolver = {
    Query: {
        async getMenuList(_, { MENU_NO }) {
            let conn = await getPoolConnection();
            try {
                let req = {
                    MENU_NO,
                };
                return await getMenuList(conn, req);
            } catch (error) {
                logger.error('getMenuList: ' + error);
                throw error;
            } finally {
                if (conn) await conn.end();
            }
        },
    },
    MenuModel: {
        children: async ({ MENU_NO }) => {
            try {
                let result = await getMenuLoader.load(MENU_NO);
                return result;
            } catch (error) {
                logger.error('MenuModel: ' + error);
                throw error;
            }
        },
    },
};
module.exports = menuResolver;
