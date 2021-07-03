import instance from './index';
import AxiosResponse from './index';

async function insertUpdateCode({
    CODE_ID,
    CODE_NM,
    USE_YN,
    IS_UPDATE,
    PARENT_CODE,
}: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    mutation{
        insertUpdateCode(CODE_ID:"${CODE_ID}", CODE_NM:"${CODE_NM}", USE_YN:"${USE_YN}", IS_UPDATE: ${IS_UPDATE}, PARENT_CODE: "${PARENT_CODE}")
    }    
    `,
    });
    return response;
}

async function checkCodeId({ CODE_ID }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    mutation{
        checkCodeId(CODE_ID:"${CODE_ID}")
    }    
    `,
    });
    return response;
}

async function checkCodeName({ CODE_NM }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    mutation{
        checkCodeName(CODE_NM:"${CODE_NM}")
    }    
    `,
    });
    return response;
}

async function getCodeList({ PARENT_CODE }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    query{
        getCodeList(PARENT_CODE:"${PARENT_CODE}"){
            CODE_ID
            CODE_NM
            CODE_TYPE
            PARENT_CODE
            USE_YN
        }
    }    
    `,
    });
    return response;
}

async function getCodeOne({ CODE_ID }: any): Promise<any> {
    console.log(CODE_ID);

    const response = await instance.post('', {
        query: `
    query{
        getCodeOne(CODE_ID:"${CODE_ID}"){
            CODE_ID
            CODE_NM
            CODE_TYPE
            PARENT_CODE
            USE_YN
        }
    }    
    `,
    });
    return response;
}

async function deleteCode({ CODE_ID }: any): Promise<any> {
    console.log(CODE_ID);

    const response = await instance.post('', {
        query: `
    mutation{
        deleteCode(CODE_ID:"${CODE_ID}")
    }    
    `,
    });
    return response;
}

export {
    insertUpdateCode,
    checkCodeId,
    checkCodeName,
    getCodeList,
    getCodeOne,
    deleteCode,
};
