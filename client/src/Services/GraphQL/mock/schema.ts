import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import mocks from './mocks'

const schemaString = `
  type Query {
    summoner(summonerName: String!): Summoner
  }
  type Summoner {
    profileIconId: String!
    summonerName: String!
    summonerLevel: Int!
    summonerId: String!
  }
`

const schema = makeExecutableSchema({ typeDefs: schemaString })
addMockFunctionsToSchema({ schema, mocks })

/**
 * @const {ExecutableSchema} schema Mock schema
 */
export default schema
