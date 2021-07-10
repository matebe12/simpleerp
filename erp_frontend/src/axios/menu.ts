import instance from './index';

async function getMenuList({ MENU_NO }: any): Promise<any> {
    const response = await instance.post('', {
        query: `
            query{
  getMenuList(MENU_NO:"${MENU_NO}"){
                MENU_NO
                MENU_NM
                MENU_URL
                ORDER
                DEL_YN
                MENU_ICON
                children{
                    MENU_NO
                    MENU_NM
                    MENU_URL
                    ORDER
                    DEL_YN
                    MENU_ICON
                  children{
                    MENU_NO
                    MENU_NM
                    MENU_URL
                    ORDER
                    DEL_YN
                    MENU_ICON
                }
                }
            
        }  
}
    `,
    });
    return response;
}

export { getMenuList };
