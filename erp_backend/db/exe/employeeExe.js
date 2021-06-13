import mariadb from 'mariadb';
import db from '../dbConnection';
require('dotenv').config();
//const query = require('./dbQuery');
//const etcSql = require('./dbEtcExe');
const logger = require('../../logger/winston');

module.exports = {
    async getEmployee(
        conn = mariadb.Connection,
        { USER_ID, USER_NM, USER_EMAIL, USE_YN, PAGE }
    ) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `
            SELECT USER_ID,
            USER_NM,
            USER_EMAIL,
            USER_BIRTH,
            USER_ADDRESS,
            USE_YN,
            CREATED_NO,
            DATE_FORMAT(CREATED_DT, "%Y %c/%e %r") AS CREATED_DT
            FROM toyerp.employee
            WHERE 1 = 1
            `;
            if (!USER_ID) str += `AND USER_ID LIKE '%${USER_ID}%'`;
            if (!USER_NM) str += `AND USER_NM LIKE '%${USER_NM}%'`;
            if (!USER_EMAIL) str += `AND USER_EMAIL LIKE '%${USER_EMAIL}%'`;

            if (USE_YN == '사용') {
                str += `USE_YN  =  Y`;
            }
            if (USE_YN == '미사용') {
                str += `USE_YN  =  N`;
            }
            str += `LIMIT ${PAGE}, 10`;
            result = await conn.query(str);
            return result;
        } catch (error) {
            logger.error('getEmployee: ' + error);
            throw error;
        } finally {
        }
    },
    async getEmployeeTotal(
        conn = mariadb.Connection,
        { USER_ID, USER_NM, USER_EMAIL, USE_YN, PAGE }
    ) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `
            SELECT COUNT(*) AS TOTAL
            FROM toyerp.employee
            WHERE 1 = 1
            `;
            if (!USER_ID) str += `AND USER_ID LIKE '%${USER_ID}%'`;
            if (!USER_NM) str += `AND USER_NM LIKE '%${USER_NM}%'`;
            if (!USER_EMAIL) str += `AND USER_EMAIL LIKE '%${USER_EMAIL}%'`;

            if (USE_YN == '사용') {
                str += `USE_YN  =  Y`;
            }
            if (USE_YN == '미사용') {
                str += `USE_YN  =  N`;
            }
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('getEmployeeTotal: ' + error);
            throw error;
        } finally {
        }
    },
    async checkId(conn = mariadb.Connection, { USER_ID }) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `SELECT COUNT(*) AS result FROM toyerp.employee WHERE USER_ID = '${USER_ID}'`;
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('checkId: ' + error);
            throw error;
        } finally {
        }
    },
    async insertEmployee(
        conn = mariadb.Connection,
        { USER_ID, USER_NM, USER_ADDRESS, USER_EMAIL, USER_BIRTH, USE_YN }
    ) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `
                INSERT INTO toyerp.employee(USER_ID,USER_NM, USER_ADDRESS, USER_EMAIL, USER_BIRTH, USE_YN , CREATED_NO, USER_PW)
                VALUES(
                    '${USER_ID}',
                    '${USER_NM}',
                    '${USER_ADDRESS}',
                    '${USER_EMAIL}',
                    '${USER_BIRTH}',
                    '${USE_YN}',
                    'admin',
                    '${process.env.INIT_PW}')
            `;
            result = await conn.query(str);
            conn.commit();
            let ss = await conn.query(
                `select * from toyerp.employee where USER_ID = '${USER_ID}'`
            );
            console.log(result);
            console.log(ss);
            return result;
        } catch (error) {
            logger.error('insertEmployee: ' + error);
            conn.rollback();
            throw error;
        } finally {
        }
    },
};
