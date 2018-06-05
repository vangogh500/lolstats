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
    seasons: [Season]
    queues: [Queue]
    normalizedSummonerStats(summonerName: String!): NormalizedSummonerStats
    seasonQueueStats(accountId: String!, seasonId: String!, queueId: String!): SeasonQueueStats
  }
  type QueueProfile {
    name: String!
    url: String!
    icon: String!
  }
  type Queue {
    id: String!
    profile: QueueProfile!
  }
  type SeasonProfile {
    name: String!
    url: String!
  }
  type Season {
    id: String!
    profile: SeasonProfile!
  }
  type SummonerProfile {
    name: String!
    profileIconId: String!
    level: Int!
  }
  type SeasonQueueTuple {
    seasonId: String!
    queueId: String!
  }
  type NormalizedSummonerStats {
    id: String!
    accountId: String!
    profile: SummonerProfile!
    seasonQueueTuples: [SeasonQueueTuple]!
  }
  type MatchSummary {
    id: String!
    lp: Int!,
    sp: Int!,
    dateTime: Date
  }
  type SeasonQueueStats {
    accountId: String!,
    seasonId: String!,
    queueId: String!,
    matchSummaries: [MatchSummary]!
  }
`

const schema = makeExecutableSchema({ typeDefs: schemaString, resolvers: { Date: GraphQLDate } })
addMockFunctionsToSchema({ schema, mocks })

/**
 * @const {ExecutableSchema} schema Mock schema
 */
export default schema
