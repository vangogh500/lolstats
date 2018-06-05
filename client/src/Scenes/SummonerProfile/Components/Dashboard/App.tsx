/**
 * @file Summoner profile dashboard
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { SeasonQueueStats } from 'Services/GraphQL/types'

/**
 * Query string
 */
const query = gql`
  query summonerProfileDashboard($accountId: String!, $seasonId: String!, $queueId: String!) {
    seasonQueueStats(accountId: $accountId, seasonId: $seasonId, queueId: $queueId) {
      matchSummaries {
        id
        lp
        sp
        dateTime
      }
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  seasonQueueStats: SeasonQueueStats
}
/**
 * Query variable types
 */
interface QueryVariables {
  accountId: string,
  seasonId: string,
  queueId: string
}
/**
 * Summoner Profile Dashboard Query
 */
class SummonerProfileDashboardQuery extends Query<QueryResponseData, QueryVariables> {}

/**
 * @type PropTypes
 * @prop {string} accountId
 * @prop {string} seasonId
 * @prop {string} queueId
 */
interface PropTypes {
  accountId: string,
  seasonId: string,
  queueId: string
}
/**
 * @type StateTypes
 */
interface StateType {}

/**
 * Summoner profile dashboard component
 */
export default class extends React.Component<PropTypes, StateType> {
  render() {
    const {accountId, seasonId, queueId} = this.props
    return (
      <SummonerProfileDashboardQuery query={query} variables={{ accountId, seasonId, queueId }}>
        {
          ({loading, error, data}) => {
            console.log({loading, error, data})
            return null
          }
        }
      </SummonerProfileDashboardQuery>
    )
  }
}