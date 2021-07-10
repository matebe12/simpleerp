import dataloader from 'dataloader';
import db from '../../db/dbConnection';
import logger from '../../logger/winston';
import exe from '../../db/exe/testExe';

export default {
    getTestLoader: new dataloader(
        async req => {
            try {
                console.log(req[0].idx);
                const conn = await db.getPoolConnection();
                const result = await exe.getTest(conn, req[0].idx);
                console.log(result);
                conn.end();

                return [result];
            } catch (error) {
                logger.log(`getTestLoader error ${error}`);
                throw new Error('getTestLoader error');
            }
        },
        { cache: false }
    ),
};
