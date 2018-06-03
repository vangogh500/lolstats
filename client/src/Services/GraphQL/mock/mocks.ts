/**
 * @file Mock resolver
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { IMockOptions } from 'graphql-tools'
import { Queue, Season, Summoner, SummonerSeasonQueueStats, SummonerSeasonStats } from 'Services/GraphQL/types'

const queues: Queue[] = [
  { id: "1", name: "Solo", url: "solo", icon: "person" },
  { id: "2", name: "Flex", url: "flex", icon: "people" },
  { id: "3", name: "TT", url: "tt", icon: "nature" }
]

const seasons: Season[] = [
  { id: "1", name: "Season 8", url: "season_8" },
  { id: "2", name: "Season 7", url: "season_7" },
  { id: "3", name: "Season 6", url: "season_6" }
]

const summoners: Summoner[] = [
  {
    "profileIconId": "23",
    "accountId": "27",
    "name": "Vangogh",
    "level": 78,
    "id": "37738212",
  },
  {
    "profileIconId": "3225",
    "accountId": "28",
    "name": "Haimi",
    "level": 58,
    "id": "31077087",
  }
]

const summonerSeasonQueueStats: SummonerSeasonQueueStats[] = [
  { accountId: "27", seasonId: "1", queueId: "1" },
  { accountId: "27", seasonId: "1", queueId: "2" },
  { accountId: "28", seasonId: "1", queueId: "1" },
  { accountId: "28", seasonId: "2", queueId: "2" },
  { accountId: "28", seasonId: "3", queueId: "1" },
  { accountId: "28", seasonId: "3", queueId: "2" },
  { accountId: "28", seasonId: "3", queueId: "3" }
]

/**
 * @constant {Resolver} resolver Resolver for mock db
 */
export default {
  Query: () => ({
    "summoner": (_: any, { summonerName }: { summonerName: string }) => {
      return summoners.find(summoner => summoner.name == summonerName) || null
    },
    "summonerSeasonQueueStats": (_: any, { summonerName }: { summonerName: string }) => {
      const summoner = summoners.find(summoner => summoner.name == summonerName)
      if(summoner) {
        return summonerSeasonQueueStats.filter(stats => stats.accountId == summoner.accountId)
      } else {
        return null
      }
    },
    "seasons": (_: any) => seasons,
    "queues": (_: any) => queues
  })
}
