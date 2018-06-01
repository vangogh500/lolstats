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
    summonerSeasonQueueStats(summonerName: String!): [SummonerSeasonQueueStats]
    seasons: [Season]
    queues: [Queue]
  }
  type Summoner {
    profileIconId: String!
    name: String!
    level: Int!
    id: String!
    accountId: String!
  }
  type Queue {
    id: String!
    name: String!
    url: String!
    icon: String!
  }
  type Season {
    id: String!
    name: String!
    url: String!
  }
  type SummonerSeasonQueueStats {
    accountId: String!
    seasonId: String!
    queueId: String!
  }
`

const schema = makeExecutableSchema({ typeDefs: schemaString })
addMockFunctionsToSchema({ schema, mocks })

/**
 * @const {ExecutableSchema} schema Mock schema
 */
export default schema
