import {gql} from "apollo-server-express";

const testType = gql `
    type Query {
        getTest(
            idx:ID!
        ):Test
    }
    type Test{
        result:[Testman]
        
    }
    type Testman{
        idx:ID
        name:String
        parents_idx:ID
        children:[Testman]
    }
`;
module.exports = [testType];