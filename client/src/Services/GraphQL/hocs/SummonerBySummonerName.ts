import gql from 'graphql-tag'
import { graphql } from "react-apollo"
import schema from '../mock/schema'

type Summoner = {
  profileIconId: string,
  summonerName: string,
  summonerLevel: number,
  summonerId: string
}

const SUMMONER_QUERY = gql`
  query GetSummoner($summonerName: String!) {
    summoner(summonerName: $summonerName) {
      summonerName
      profileIconId
    }
  }
`

export type Response = {
  summoner: Summoner
}
export type InputProps = {
  summonerName: string
}

export const SummonerBySummonerName = graphql<InputProps, Response>(SUMMONER_QUERY, {
  options: ({ summonerName }) => ({
    variables: { summonerName }
  })
})
