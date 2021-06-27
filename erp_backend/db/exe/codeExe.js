import mariadb from 'mariadb';
import db from '../dbConnection';
require('dotenv').config();
const logger = require('../../logger/winston');

module.exports = {
    async checkCodeId(conn = mariadb.Connection, { CODE_ID }) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `SELECT COUNT(*) AS result FROM toyerp.common_code WHERE CODE_TYPE = '${CODE_ID}'`;
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('checkCodeId: ' + error);
            throw error;
        } finally {
        }
    },
    async getCodeList(conn = mariadb.Connection, { PARENT_CODE }) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `SELECT CODE_ID,CODE_NM,CODE_TYPE,PARENT_CODE,USE_YN FROM toyerp.common_code WHERE PARENT_CODE = '${PARENT_CODE}'`;
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('getCodeList: ' + error);
            throw error;
        } finally {
        }
    },
    async getCodeOne(conn = mariadb.Connection, { CODE_ID }) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `SELECT CODE_ID,CODE_NM,CODE_TYPE,PARENT_CODE,USE_YN FROM toyerp.common_code WHERE CODE_ID = '${CODE_ID}'`;
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('getCodeList: ' + error);
            throw error;
        } finally {
        }
    },
    async checkCodeName(conn = mariadb.Connection, { CODE_NM }) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `SELECT COUNT(*) AS result FROM toyerp.common_code WHERE CODE_NM = '${CODE_NM}'`;
            result = await conn.query(str);

            //console.log(result);
            return result;
        } catch (error) {
            logger.error('checkCodeName: ' + error);
            throw error;
        } finally {
        }
    },
    async insertCode(
        conn = mariadb.Connection,
        { CODE_ID, CODE_NM, PARENT_CODE, USE_YN }
    ) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str1 = `SELECT 	CONCAT('${CODE_ID}', SUBSTR(IFNULL((CAST(SUBSTR(MAX(CODE_ID), LENGTH(MAX(CODE_ID)) - 8, 9) AS UNSIGNED) + 1000000001), '1000000001'), 2, 9)) AS CODE_ID
		FROM   	toyerp.common_code where code_type = '${CODE_ID}';`;
            let nextval = await conn.query(str1);
            console.log(nextval[0]['CODE_ID']);
            let parent = PARENT_CODE == '' ? 'root' : PARENT_CODE;
            let str2 = `
                INSERT INTO toyerp.common_code(CODE_ID,CODE_NM, PARENT_CODE, USE_YN , CREATED_NO, CODE_TYPE)
                VALUES(
                    '${nextval[0]['CODE_ID']}',
                    '${CODE_NM}',
                    '${parent}',
                    '${USE_YN}',
                    'admin',
                    '${CODE_ID}'
                    )
            `;
            result = await conn.query(str2);
            conn.commit();
            console.log(result);
            return result;
        } catch (error) {
            logger.error('insertCode: ' + error);
            conn.rollback();
            throw error;
        } finally {
        }
    },
    async updateEmployee(
        conn = mariadb.Connection,
        { USER_ID, USER_NM, USER_ADDRESS, USER_EMAIL, USER_BIRTH, USE_YN }
    ) {
        try {
            await conn.beginTransaction();
            let result = [];
            let str = `
            
                UPDATE toyerp.employee
                SET 
                USER_NM        =          '${USER_NM}',
                USER_ADDRESS   =          '${USER_ADDRESS}',
                USER_EMAIL     =          '${USER_EMAIL}',
                USER_BIRTH     =          '${USER_BIRTH}',
                USE_YN         =          '${USE_YN}'
                WHERE USER_ID = "${USER_ID}"
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
