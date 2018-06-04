/**
 * @file Summoner profile app
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { ChildProps } from "react-apollo"
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { Summoner, Queue, Season, SummonerSeasonQueueStats } from 'Services/GraphQL/types'

import Profile from 'Scenes/SummonerProfile/Components/Profile'
import QueueNav from 'Scenes/SummonerProfile/Components/QueueNav'
import SeasonNav from 'Scenes/SummonerProfile/Components/SeasonNav'
import LoadingFullScreen from 'Scenes/SummonerProfile/Components/LoadingFullScreen'
import RemoveOnAnimationEnd from 'Components/Animations/RemoveOnAnimationEnd'
import AddOnDelay from 'Components/Animations/AddOnDelay'

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
      url
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
            if(error) {
              console.log(error)
            }
            return (
              <div className="d-flex flex-grow-1 flex-column">
                <RemoveOnAnimationEnd className={"d-flex flex-grow-1 justify-content-center align-items-center flex-column bg-primary " + (loading ? "" : "animated fadeOutUp")}>
                  <LoadingFullScreen />
                </RemoveOnAnimationEnd>
                  {
                    (() => {
                      if(data) {
                        const {summoner, queues, seasons, summonerSeasonQueueStats} = data
                        if(summoner) {
                          return (
                            <AddOnDelay delay={1000} className="d-flex flex-grow-1 flex-column bg-grey animated fadeInDown">
                              <Profile profile={summoner}>
                                <QueueNav className="ml-auto" />
                              </Profile>
                              <div className="container">
                                <SeasonNav />
                              </div>
                            </AddOnDelay>
                          )
                        } else {
                          return (
                            <AddOnDelay delay={1000} className="d-flex flex-grow-1 flex-column animated fadeInDown">
                              <div className="h-40px bg-primary w-100"></div>
                              <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
                                <h1>404</h1>
                                <p className="text-muted">Summoner mia</p>
                              </div>
                            </AddOnDelay>
                          )
                        }
                      } else {
                        return null
                      }
                    })()
                  }
              </div>
            )
          }
        }
      </SummonerProfileQuery>
    )
  }
}
