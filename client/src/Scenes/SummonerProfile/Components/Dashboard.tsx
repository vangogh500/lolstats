/**
 * @file Dashboard component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { NormalizedSummonerMatchStats } from 'Services/GraphQL/types'

/**
 * Query string
 */
const query = gql`
  query dashboard($summonerName: String!, $queueId: String!, $seasonId: String!) {
    normalizedSummonerMatchStats(summonerName: $summonerName, queueId: $queueId, seasonId: $seasonId) {
      dateTime
      lp
      sp
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  normalizedSummonerMatchStats: NormalizedSummonerMatchStats[]
}
/**
 * Query variable types
 */
interface QueryVariables {
  summonerName: string,
  queueId: string,
  seasonId: string
}
/**
 * Summoner profile query
 */
class DashboardQuery extends Query<QueryResponseData, QueryVariables> {}


/**
 * @type Season nav prop types
 */
interface PropTypes {
}
/**
 * @type Season nav state types
 */
interface StateType {}

/**
 * Season nav
 */
export default class SeasonNav extends React.Component<PropTypes, StateType> {
  render() {
    return (
      <Route path='/summoner/:summonerName/:season/:queue' render={({match}) => (
        <DashboardQuery query={query} variables={{summonerName: match.params.summonerName, queueId: match.params.queue, seasonId: match.params.season}}>
          {
            ({ loading, error, data}) => {
              if(loading) {
                return null
              } else if(error) {
                console.log(error)
              } else {
                const { normalizedSummonerMatchStats } = data
                return <div></div>
              }
            }
          }
        </DashboardQuery>
      )} />
    )
  }
}
