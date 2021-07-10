import { gql } from 'apollo-server-express';

const codeType = gql`
    type Query {
        getMenuList(MENU_NO: String): [MenuModel]
    }
    type MenuModel {
        MENU_NO: ID
        MENU_NM: String
        PARENT_NO: ID
        MENU_URL: String
        DISP_YN: String
        ORDER: Int
        DEL_YN: String
        CREATED_NO: String
        MENU_ICON: String
        children: [MenuModel]
    }
`;
module.exports = [codeType];
