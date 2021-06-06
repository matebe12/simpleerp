import mariadb from "mariadb";
import db from "../dbConnection";
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

module.exports = {
    async getTest(conn = mariadb.Connection, req = null){
    try {
      await conn.beginTransaction();
      let result = [];
      console.log(req);
      let str = `
      SELECT * FROM test.new_table where parents_idx = ${req};
      `;
      result = await conn.query(str);
      return {result};
    } catch (error) {
        logger.error("getTestExe: " + error);
            throw error;
    }finally{

    }
}}

