import AxiosService from './index';
import AxiosResponse from './index';

async function getEmployee({
    USER_ID,
    USER_NM,
    USER_EMAIL,
    USE_YN,
    PAGE,
}: any): Promise<any> {
    const response: AxiosResponse = await AxiosService.instance.post('', {
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

async function checkId({ USER_ID }: any): Promise<any> {
    const response: AxiosResponse = await AxiosService.instance.post('', {
        query: `
    mutation{
        checkId(USER_ID:"${USER_ID}")
    }    
    `,
    });
    return response;
}

async function insertEmployee({
    USER_ID,
    USER_NM,
    USER_EMAIL,
    USE_YN,
    USER_BIRTH,
    USER_ADDRESS,
}: any): Promise<any> {
    const response: AxiosResponse = await AxiosService.instance.post('', {
        query: `
    mutation{
        insertEmployee(USER_ID:"${USER_ID}", USER_NM:"${USER_NM}",USER_EMAIL:"${USER_EMAIL}", USE_YN:"${USE_YN}", USER_BIRTH:"${USER_BIRTH}", USER_ADDRESS:"${USER_ADDRESS}")
    }    
    `,
    });
    return response;
}

export { getEmployee, checkId, insertEmployee };
