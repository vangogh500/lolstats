/**
 * @file Mock schema
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import mocks from 'Services/GraphQL/mock/mocks'
import GraphQLDate from 'Services/GraphQL/GraphQLDate'

const schemaString = `
  scalar Date
  type Query {
    summoner(summonerName: String!): Summoner
    summonerSeasonQueueStats(summonerName: String!): [SummonerSeasonQueueStats]
    seasons: [Season]
    queues: [Queue]
    normalizedSummonerMatchStats(summonerName: String!, queueId: String!, seasonId: String!): [NormalizedSummonerMatchStats]
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
  type NormalizedSummonerMatchStats {
    accountId: String!
    seasonId: String!
    queueId: String!
    matchId: String!
    dateTime: Date!
    lp: Number!
    sp: Number!
  }
`

const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: { Date: GraphQLDate } })
addMockFunctionsToSchema({ schema, mocks })

/**
 * @const {ExecutableSchema} schema Mock schema
 */
export default schema
