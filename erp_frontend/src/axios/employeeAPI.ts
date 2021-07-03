import instance from './index';

async function getEmployee({
    USER_ID,
    USER_NM,
    USER_EMAIL,
    USE_YN,
    PAGE,
}: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    query{
        getEmployee(USER_ID:"${USER_ID}", USER_NM:"${USER_NM}",USER_EMAIL:"${USER_EMAIL}", USE_YN:"${USE_YN}",PAGE:${PAGE}){
            Employee{
                USER_ID
                USER_NM
                USER_EMAIL
                USER_BIRTH
                USER_ADDRESS
                USE_YN
                CREATED_NO
                CREATED_DT
                }
            TotalCnt
        }
    }
    
    `,
    });
    return response;
}

async function getEmployeeOne({ USER_ID }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    query{
        getEmployeeOne(USER_ID:"${USER_ID}"){
                USER_ID
                USER_NM
                USER_EMAIL
                USER_BIRTH
                USER_ADDRESS
                USE_YN
                CREATED_NO
                CREATED_DT
        }
    }
    
    `,
    });
    return response;
}

async function checkId({ USER_ID }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    mutation{
        checkId(USER_ID:"${USER_ID}")
    }    
    `,
    });
    return response;
}

async function insertUpdateEmployee({
    USER_ID,
    USER_NM,
    USER_EMAIL,
    USE_YN,
    USER_BIRTH,
    USER_ADDRESS,
    IS_UPDATE,
}: any): Promise<any> {
    const response = await instance.post('', {
        query: `
    mutation{
        insertUpdateEmployee(USER_ID:"${USER_ID}", USER_NM:"${USER_NM}",USER_EMAIL:"${USER_EMAIL}", USE_YN:"${USE_YN}", USER_BIRTH:"${USER_BIRTH}", USER_ADDRESS:"${USER_ADDRESS}", IS_UPDATE: ${IS_UPDATE})
    }    
    `,
    });
    return response;
}

export { getEmployee, checkId, insertUpdateEmployee, getEmployeeOne };
