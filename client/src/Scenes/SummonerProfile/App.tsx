/**
 * @file Summoner profile app
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { ChildProps } from "react-apollo";
import { Query } from "react-apollo";
import gql from 'graphql-tag'
import { Summoner, Queue, Season, SummonerSeasonQueueStats } from 'Services/GraphQL/types'

import Profile from 'Scenes/SummonerProfile/Components/Profile'
import QueueNav from 'Scenes/SummonerProfile/Components/QueueNav'
import SeasonNav from 'Scenes/SummonerProfile/Components/SeasonNav'


/**
 * Query string
 */
const query = gql`
  query summonerProfile($summonerName: String!) {
    summoner(summonerName: $summonerName) {
      name
      profileIconId
    }
    summonerSeasonQueueStats(summonerName: $summonerName) {
      queueId
      seasonId
      accountId
    }
    queues {
      id
      name
      url
      icon
    }
    seasons {
      id
      name
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  summoner: Summoner,
  queues: Queue[],
  seasons: Season[],
  summonerSeasonQueueStats: SummonerSeasonQueueStats[]
}
/**
 * Query variable types
 */
interface QueryVariables {
  summonerName: string
}
/**
 * Summoner profile query
 */
class SummonerProfileQuery extends Query<QueryResponseData, QueryVariables> {}

/**
 * Summoner profile app prop types
 */
interface PropType {
  summonerName: string,
  queue: string
}
/**
 * Summoner profile app state types
 */
interface StateType {}
/**
 * Summoner profile app
 */
export default class App extends React.Component<PropType, StateType> {
  render() {
    const {summonerName, queue} = this.props
    return (
      <SummonerProfileQuery query={query} variables={{ summonerName }}>
        {
          ({loading, error, data}) => {
            if(loading) {
              return null;
            }
            else if(error) {
              console.log(error)
            }
            else {
              const {summoner, queues, seasons, summonerSeasonQueueStats} = data
              const queueMap: { [id: string]: Queue } = queues.reduce((acc, queue) => ({ ...acc, [queue.id]: queue }), {})
              console.log(queueMap)
              const applicableQueueIds: string[] = Object.keys(
                summonerSeasonQueueStats.reduce((acc, stats) => ({ ...acc, [stats.queueId]: true }), {})
              )
              return (
                <div className="d-flex flex-column">
                  <Profile profile={summoner}>
                    <QueueNav className="ml-auto" queues={applicableQueueIds.map(id => queueMap[id])} />
                  </Profile>
                  <div className="container">
                    <SeasonNav seasons={["Season 8", "Season 7"]} />
                  </div>
                </div>
              )
            }
          }
        }
      </SummonerProfileQuery>
    )
  }
}
