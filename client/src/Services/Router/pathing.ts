export const PATH_SUMMONER_PROFILE = '/summoner/:summonerName/:season/:queue'

export const createPathSummonerProfile = (summonerName: string, season: string = "all", queue: string = "all") => {
  return PATH_SUMMONER_PROFILE.replace(':summonerName', summonerName).replace(':season', season).replace(':queue', queue)
}
