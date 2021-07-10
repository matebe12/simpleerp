import dataloader from 'dataloader';
import { getPoolConnection } from '../../db/dbConnection';
import logger from '../../logger/winston';
import { getMenuList } from '../../db/exe/menuExe';

const getMenuLoader = new dataloader(
    async req => {
        const conn = await getPoolConnection();
        console.log('dd', req);
        try {
            const result = await getMenuList(conn, req);
            //console.log(result);
            return result;
        } catch (error) {
            logger.log(`getMenuLoader2 error ${error}`);
            throw new Error('getMenuLoader2 error');
        } finally {
            conn.end();
        }
    },
    { cache: false }
);
export { getMenuLoader };
