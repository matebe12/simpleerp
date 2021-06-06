import AxiosService from './index';
import AxiosResponse from './index';

async function getEmployee(): Promise<any> {
    const response: AxiosResponse = await AxiosService.instance.post('', {
        query: `
    query{
        getEmployee{
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

export { getEmployee };
