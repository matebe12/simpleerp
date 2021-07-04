import dataloader from 'dataloader';
import db from '../../db/dbConnection';
import logger from '../../logger/winston';
import exe from '../../db/exe/menuExe';

export default {
    getMenuLoader: new dataloader(
        async req => {
            try {
                const conn = await db.getPoolConnection();
                const result = await exe.getMenuList(conn, req[0].MENU_NO);
                conn.close();
                console.log(result);
                return [result];
            } catch (error) {
                logger.log(`getMenuLoader2 error ${error}`);
                throw new Error('getMenuLoader2 error');
            } finally {
                //conn.close();
            }
        },
        { cache: true }
    ),
};
