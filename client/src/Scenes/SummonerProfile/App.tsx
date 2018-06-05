/**
 * @file Summoner profile app
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { Redirect } from 'react-router'
import { Queue, Season, NormalizedSummonerStats } from 'Services/GraphQL/types'

import { createPathSummonerProfile } from 'Services/Router/pathing'
import Profile from 'Scenes/SummonerProfile/Components/Profile'
import QueueNav from 'Scenes/SummonerProfile/Components/QueueNav'
import SeasonNav from 'Scenes/SummonerProfile/Components/SeasonNav'
import Dashboard from 'Scenes/SummonerProfile/Components/Dashboard/App'
import LoadingFullScreen from 'Scenes/SummonerProfile/Components/LoadingFullScreen'
import RemoveOnAnimationEnd from 'Components/Animations/RemoveOnAnimationEnd'
import AddOnDelay from 'Components/Animations/AddOnDelay'

/**
 * Query string
 */
const query = gql`
  query summonerProfile($summonerName: String!) {
    normalizedSummonerStats(summonerName: $summonerName) {
      id
      accountId
      profile {
        name
        profileIconId
        level
      }
      seasonQueueTuples {
        seasonId
        queueId
      }
    }
    seasons {
      id
      profile {
        name
        url
      }
    }
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
  normalizedSummonerStats: NormalizedSummonerStats,
  queues: Queue[],
  seasons: Season[]
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
  queueUrl: string,
  seasonUrl: string
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
    const {summonerName, queueUrl, seasonUrl} = this.props
    return (
      <SummonerProfileQuery query={query} variables={{ summonerName }}>
        {
          ({loading, error, data}) => {
            if(error) {
              console.log(error)
              return null
            }
            return (
              <div className="d-flex flex-grow-1 flex-column">
                <RemoveOnAnimationEnd className={"d-flex flex-grow-1 justify-content-center align-items-center flex-column bg-primary " + (loading ? "" : "animated fadeOutUp")}>
                  <LoadingFullScreen />
                </RemoveOnAnimationEnd>
                  {
                    (() => {
                      if(data) {
                        const {normalizedSummonerStats, queues, seasons } = data
                        if(normalizedSummonerStats) {
                          const { accountId, seasonQueueTuples } = normalizedSummonerStats
                          const queueIdToQueue: { [id: string]: Queue } = queues.reduce((acc, queue) => (
                              { ...acc, [queue.id]: queue }
                            ), {})
                          const seasonIdToSeason: { [id: string]: Season } = seasons.reduce((acc, season) => (
                              { ...acc, [season.id]: season }
                            ), {})
                          const validQueues = Object.keys(seasonQueueTuples.reduce((acc, tuple) => (
                              { ...acc, [tuple.queueId]: true }
                            ), {})).reduce((acc, id) => (
                              [...acc, queueIdToQueue[id]
                            ]), [])
                          const validSeasons = Object.keys(seasonQueueTuples.reduce((acc, tuple) => (
                              { ...acc, [tuple.seasonId]: true }
                            ), {})).reduce((acc, id) => (
                              [...acc, seasonIdToSeason[id]]
                            ), [])
                          const queue = validQueues.find(queue => queue.profile.url.toUpperCase() == queueUrl.toUpperCase())
                          const season = validSeasons.find(season => season.profile.url.toUpperCase() == seasonUrl.toUpperCase())
                          if(!queue || !season) {
                            const queueRedirect = queue ? queueUrl : validQueues[0].profile.url
                            const seasonRedirect = season ? seasonUrl : validSeasons[0].profile.url
                            return (
                              <Redirect to={createPathSummonerProfile(summonerName, seasonRedirect, queueRedirect)}/>
                            )
                          } else {
                            return (
                              <AddOnDelay delay={1000} className="d-flex flex-grow-1 flex-column bg-grey animated fadeInDown">
                                <Profile profile={normalizedSummonerStats.profile}>
                                  <QueueNav
                                    className="ml-auto"
                                    queues={validQueues}
                                    urlBuilder={createPathSummonerProfile.bind(null, summonerName, seasonUrl)}
                                    activeValidator={(queue) => (queue.profile.url.toUpperCase() == queueUrl.toUpperCase())} />
                                </Profile>
                                <div className="container">
                                  <SeasonNav
                                    seasons={validSeasons}
                                    urlBuilder={(url) => createPathSummonerProfile(summonerName, url, queueUrl)} />
                                  <Dashboard accountId={accountId} seasonId={season.id} queueId={queue.id} />
                                </div>
                              </AddOnDelay>
                            )
                          }
                        } else {
                          // 404
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
