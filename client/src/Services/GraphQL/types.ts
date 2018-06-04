/**
 * @module types Type definitions
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

export interface Summoner {
  id: string,
  accountId: string
  profileIconId: string,
  name: string,
  level: number
}

export interface Queue {
  id: string,
  name: string,
  url: string,
  icon: string
}

export interface Season {
  id: string,
  name: string,
  url: string
}

export interface SummonerSeasonStats {
  seasonId: string,
  accountId: string
}

export interface SummonerSeasonQueueStats {
  queueId: string
  seasonId: string,
  accountId: string
}

export interface NormalizedSummonerMatchStats {
  accountId: string,
  seasonId: string,
  queueId: string,
  matchId: string,
  dateTime: Date,
  lp: number,
  sp: number
}
