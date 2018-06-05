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
import { Queue } from 'Services/GraphQL/types'
import { createPathSummonerProfile } from 'Services/Router/pathing'

/**
 * Query string
 */
const query = gql`
  query queueNav {
    queues {
      id
      profile {
        name
        url
        icon
      }
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  queues: Queue[],
}
/**
 * Query variable types
 */
interface QueryVariables {}
/**
 * Summoner profile query
 */
class QueueNavQuery extends Query<QueryResponseData, QueryVariables> {}

/**
 * @type Queue nav prop types
 */
interface PropTypes {
  className?: string,
  currentSummonerName: string,
  currentQueueUrl: string,
  currentSeasonUrl: string,
  validQueueIds: string[]
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
  static ACTIVE_LINK_CLASS = "active bg-ternary darken-2"
  static INACTIVE_LINK_CLASS = "bg-primary"

  render() {
    const { className, validQueueIds, currentSummonerName, currentQueueUrl, currentSeasonUrl } = this.props
    const activeClassName = "active bg-ternary darken-2"
    const inactiveClassName = "bg-primary"
    return (
      <QueueNavQuery query={query}>
        {
          ({ loading, error, data}) => {
            if(loading) {
              return null
            } else if(error) {
              console.log(error)
              return null
            } else {
              const { queues } = data
              const queueIdToQueue: { [id: string]: Queue } = queues.reduce((acc, queue) => ({ ...acc, [queue.id]: queue }), {})
              const queuesToDisplay = validQueueIds.reduce((acc, id) => ([...acc, queueIdToQueue[id]]), [])
              if(!queuesToDisplay.find(queue => queue.profile.url.toUpperCase() == currentQueueUrl.toUpperCase())) {
                return (
                  <Redirect to={createPathSummonerProfile(currentSummonerName, currentSeasonUrl, queuesToDisplay[0].profile.url)}/>
                )
              } else {
                return (
                  <div className={"btn-group btn-group-toggle " + className} data-toggle="buttons">
                    {
                      queuesToDisplay.map(({id, profile}) => (
                        <Link
                          key={"queue-nav-" + id} to={createPathSummonerProfile(currentSummonerName, currentSeasonUrl, profile.url)}
                          className={"btn px-3 py-2 text-white " + (profile.url.toUpperCase() == currentQueueUrl.toUpperCase() ? QueueNav.ACTIVE_LINK_CLASS : QueueNav.INACTIVE_LINK_CLASS)}>
                            <i className="material-icons align-middle">{profile.icon}</i> <span className="align-middle">{profile.name}</span>
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
    )
  }
}
