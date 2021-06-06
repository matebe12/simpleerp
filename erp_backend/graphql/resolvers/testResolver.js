require("dotenv").config();
import db from "../../db/dbConnection";
import testLoader from '../dataloader/testLoader.js';
import logger from '../../logger/winston';

//const commonSql = require("../../db/dbCommonExe")

const testResolver = {
    Query: {
        async getTest(_, {
            idx
        }) {
            let conn = await db.getPoolConnection();
            try {
                let req = {
                    idx
                };
                const results = await testLoader.getTestLoader.load(req);
                console.log(results);
                return results;
            } catch (error) {
                logger.error('getTest: ' + error);
                throw error;
            }finally{
                if (conn) await db.endPoolConnection(conn);
            }
        }
    },
    Testman:{
        children: async (parent) => { 

            try {
                idx: parent.idx;
                name: parent.name;
                parents_idx: parent.parents_idx;
                 let conn = await db.getPoolConnection();
                 let str = `SELECT * FROM test.new_table where parents_idx = ${parent.idx};`;
                 let result = await conn.query(str);
                 console.log(str);
                return result;
            } catch (error) {
                logger.error("getTestExe: " + error);
            throw error;
            }
            },
 }
}
module.exports = testResolver;