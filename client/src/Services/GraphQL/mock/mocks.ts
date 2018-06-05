/**
 * @file Mock resolver
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { IMockOptions } from 'graphql-tools'
import { Queue, Season, NormalizedSummonerStats, SeasonQueueStats } from 'Services/GraphQL/types'

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
    "accountId": "1",
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
    "accountId": "2",
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

const seasonQueueStats: SeasonQueueStats[] = [
  {
    accountId: "1",
    seasonId: "1",
    queueId: "1",
    matchSummaries: [
      { id: "1", lp: 1000, sp: 1050, dateTime: new Date(Date.UTC(2018, 1, 2, 10)) },
      { id: "1", lp: 982, sp: 1000, dateTime: new Date(Date.UTC(2018, 1, 2, 11)) },
      { id: "1", lp: 960, sp: 1055, dateTime: new Date(Date.UTC(2018, 1, 2, 12)) },
      { id: "1", lp: 932, sp: 1058, dateTime: new Date(Date.UTC(2018, 1, 2, 13)) },
      { id: "1", lp: 951, sp: 1045, dateTime: new Date(Date.UTC(2018, 1, 2, 20)) },
      { id: "1", lp: 976, sp: 1040, dateTime: new Date(Date.UTC(2018, 1, 3, 20)) },
      { id: "1", lp: 959, sp: 1031, dateTime: new Date(Date.UTC(2018, 1, 3, 21)) },
      { id: "1", lp: 980, sp: 1050, dateTime: new Date(Date.UTC(2018, 1, 4, 10)) }
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
    },
    "seasonQueueStats": (_: any, { accountId, seasonId, queueId }: { accountId: string, seasonId: string, queueId: string}) => {
      return seasonQueueStats.find(stats => (stats.accountId == accountId && stats.seasonId == seasonId && stats.queueId == queueId))
    }
  })
}
