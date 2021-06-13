import dataloader from 'dataloader';
import db from '../../db/dbConnection';
import logger from '../../logger/winston';
import exe from '../../db/exe/employeeExe';

export default {
    getEmployeeLoader: new dataloader(
        async req => {
            try {
                const conn = await db.getPoolConnection();
                const result = await exe.employeeExe(conn, req);
                console.log(result);
                return [result];
            } catch (error) {
                logger.log(`getEmployeeLoader error ${error}`);
                throw new Error('getEmployeeLoader error');
            }
        },
        { cache: false }
    ),
};
