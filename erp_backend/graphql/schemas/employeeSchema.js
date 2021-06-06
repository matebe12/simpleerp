import { gql } from 'apollo-server-express';

const employeeType = gql`
    type Query {
        getEmployee: [Employee]
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
