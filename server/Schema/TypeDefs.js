import { gql } from 'apollo-server-express'


export const typeDefs = gql`

type Data{
       id:ID!
       name:String!
}
type Query{
    allData:[Data]!
    deletedData(id:ID!):Data!
}
type Mutation{
    addData(name:String!):Data!
    editData(name:String!, id:ID!):Data!
}
type Subscription{
    newData:Data!
    delData:Data!
    updateData:Data!
}
`;