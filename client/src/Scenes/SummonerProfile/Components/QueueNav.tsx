/**
 * @file Queue toggle component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { Queue, SummonerSeasonQueueStats } from 'Services/GraphQL/types'

/**
 * Query string
 */
const query = gql`
  query queueNav($summonerName: String!) {
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
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  queues: Queue[],
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
class QueueNavQuery extends Query<QueryResponseData, QueryVariables> {}

/**
 * @type Queue nav prop types
 */
interface PropTypes {
  className?: string
}
/**
 * @type Queue nav state types
 */
interface StateType {}

/**
 * Queue nav
 * @event Redirect if the current url does not match any of the queues provided
 */
export default class QueueNav extends React.Component<PropTypes, StateType> {
  render() {
    const { className } = this.props
    const activeClassName = "active bg-ternary darken-2"
    const inactiveClassName = "bg-primary"
    return (
      <Route path='/summoner/:summonerName/:season/:queue' render={({match}) => (
        <QueueNavQuery query={query} variables={{ summonerName: match.params.summonerName}}>
          {
            ({ loading, error, data}) => {
              if(loading) {
                return null
              } else {
                const { queues, summonerSeasonQueueStats } = data
                const queueMap: { [id: string]: Queue } = queues.reduce((acc, queue) => ({ ...acc, [queue.id]: queue }), {})
                const applicableQueueIds: string[] = Object.keys(
                  summonerSeasonQueueStats.reduce((acc, stats) => ({ ...acc, [stats.queueId]: true }), {})
                )
                const applicableQueues = applicableQueueIds.map(id => queueMap[id])
                if(!applicableQueues.find(queue => queue.url.toUpperCase() == match.params.queue.toUpperCase())) {
                  return (
                    <Redirect to={"/summoner/" + match.params.summonerName + "/" + match.params.season + "/" + applicableQueues[0].url}/>
                  )
                } else {
                  return (
                    <div className={"btn-group btn-group-toggle " + className} data-toggle="buttons">
                      {
                        applicableQueues.map(({id, name, url, icon}) => (
                          <Link
                            key={"queue-nav-" + id} to={"/summoner/" + match.params.summonerName + "/" + match.params.season + "/" + url}
                            className={"btn px-3 py-2 text-white " + (url.toUpperCase() == match.params.queue.toUpperCase() ? activeClassName: inactiveClassName)}>
                              <i className="material-icons align-middle">{icon}</i> <span className="align-middle">{name}</span>
                          </Link>
                        ))
                      }
                    </div>
                  )
                }
              }
            }
          }
        </QueueNavQuery>
      )} />
    )
  }
}
