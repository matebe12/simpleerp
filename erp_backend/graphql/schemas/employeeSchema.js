import { gql } from 'apollo-server-express';

const employeeType = gql`
    type Query {
        getEmployee(
            USER_ID: String
            USER_NM: String
            USER_EMAIL: String
            USE_YN: String
            PAGE: Int
        ): GetEmployee
    }
    type Mutation {
        checkId(USER_ID: String): Int
        insertEmployee(
            USER_ID: String!
            USER_NM: String!
            USER_ADDRESS: String
            USER_EMAIL: String
            USER_BIRTH: String
            USE_YN: String!
        ): Int
    }
    input RequestEmployee {
        USER_ID: String!
        USER_NM: String!
        USER_ADDRESS: String
        USER_EMAIL: String
        USER_BIRTH: String
        USE_YN: String!
    }
    type GetEmployee {
        Employee: [Employee]
        TotalCnt: Int
    }
    type Employee {
        USER_ID: ID
        USER_NM: String
        USER_EMAIL: String
        USER_BIRTH: String
        USER_ADDRESS: String
        USE_YN: String
        CREATED_NO: String
        CREATED_DT: String
    }
`;
module.exports = [employeeType];
