/**
 * @file Mock schema
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import mocks from 'Services/GraphQL/mock/mocks'

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
