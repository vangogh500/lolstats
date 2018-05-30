import { IMockOptions } from 'graphql-tools'

const summoners = [
  {
    "profileIconId": "23",
    "summonerName": "Vangogh",
    "summonerLevel": 78,
    "summonerId": "37738212",
  },
  {
    "profileIconId": "3225",
    "summonerName": "Haimi",
    "summonerLevel": 58,
    "summonerId": "31077087",
  }
]



export default {
  Query: () => ({
    "summoner": (_: any, { summonerName }: { summonerName: string }) => summoners.find(function(summoner) {
        return summoner.summonerName == summonerName
    })
  })
}