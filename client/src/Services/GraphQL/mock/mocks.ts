/**
 * @file Mock resolver
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { IMockOptions } from 'graphql-tools'
import { Queue, Season, NormalizedSummonerStats } from 'Services/GraphQL/types'

const queues: Queue[] = [
  { id: "1", profile: { name: "Solo", url: "solo", icon: "person" }},
  { id: "2", profile: { name: "Flex", url: "flex", icon: "people" }},
  { id: "3", profile: { name: "TT", url: "tt", icon: "nature" }}
]

const seasons: Season[] = [
  { id: "1", profile: { name: "Season 8", url: "season_8" }},
  { id: "2", profile: { name: "Season 7", url: "season_7" }},
  { id: "3", profile: { name: "Season 6", url: "season_6" }}
]

const normalizedSummonerStats: NormalizedSummonerStats[] = [
  {
    "id": "37738212",
    "profile": {
      "profileIconId": "23",
      "name": "Vangogh",
      "level": 78,
    },
    "seasonQueueTuples": [
      { "queueId": "1", "seasonId": "1" },
      { "queueId": "2", "seasonId": "1" }
    ]
  },
  {
    "id": "31077087",
    "profile": {
      "profileIconId": "3225",
      "name": "Haimi",
      "level": 58,
    },
    "seasonQueueTuples": [
      { "queueId": "1", "seasonId": "1" },
      { "queueId": "1", "seasonId": "3" },
      { "queueId": "2", "seasonId": "2" },
      { "queueId": "2", "seasonId": "3" },
      { "queueId": "3", "seasonId": "3" }
    ]
  }
]

/**
 * @constant {Resolver} resolver Resolver for mock db
 */
export default {
  Query: () => ({
    "seasons": (_: any) => seasons,
    "queues": (_: any) => queues,
    "normalizedSummonerStats": (_: any, { summonerName }: { summonerName: string }) => {
      return normalizedSummonerStats.find(stats => stats.profile.name == summonerName)
    }
  })
}
