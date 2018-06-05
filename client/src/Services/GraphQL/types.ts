/**
 * @module types Type definitions
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

export interface Queue {
  id: string,
  profile: {
    name: string,
    url: string,
    icon: string
  }
}

export interface Season {
  id: string,
  profile: {
    name: string,
    url: string
  }
}

export interface SeasonQueueTuple {
  seasonId: string,
  queueId: string
}

export interface SummonerProfile {
  profileIconId: string,
  name: string,
  level: number
}

export interface NormalizedSummonerStats {
  id: string,
  profile: SummonerProfile,
  seasonQueueTuples: SeasonQueueTuple[]
}
