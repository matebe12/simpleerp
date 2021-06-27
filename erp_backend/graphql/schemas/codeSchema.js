import { gql } from 'apollo-server-express';

const codeType = gql`
    type Query {
        getCodeList(PARENT_CODE: String!): [Code]
        getCodeOne(CODE_ID: String!): [Code]
    }
    type Code {
        CODE_ID: String
        CODE_NM: String
        CODE_TYPE: String
        PARENT_CODE: String
        USE_YN: String
    }
    type Mutation {
        checkCodeId(CODE_ID: String): Int
        checkCodeName(CODE_NM: String): Int
        insertUpdateCode(
            CODE_ID: String!
            CODE_NM: String!
            PARENT_CODE: String
            USE_YN: String!
            IS_UPDATE: Boolean
        ): Int
    }
`;
module.exports = [codeType];
