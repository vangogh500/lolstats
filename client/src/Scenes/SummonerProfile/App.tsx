/**
 * @file Summoner profile app
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { Queue, Season, NormalizedSummonerStats } from 'Services/GraphQL/types'

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
    normalizedSummonerStats(summonerName: $summonerName) {
      id
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
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  normalizedSummonerStats: NormalizedSummonerStats
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
  queue: string,
  season: string
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
    const {summonerName, queue, season} = this.props
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
                        const {normalizedSummonerStats } = data
                        if(normalizedSummonerStats) {
                          const { seasonQueueTuples } = normalizedSummonerStats
                          const uniqueQueueIds = Object.keys(seasonQueueTuples.reduce((acc, tuple) => ({ ...acc, [tuple.queueId]: true }), {}))
                          const uniqueSeasonIds = Object.keys(seasonQueueTuples.reduce((acc, tuple) => ({ ...acc, [tuple.seasonId]: true }), {}))
                          return (
                            <AddOnDelay delay={1000} className="d-flex flex-grow-1 flex-column bg-grey animated fadeInDown">
                              <Profile profile={normalizedSummonerStats.profile}>
                                <QueueNav className="ml-auto" validQueueIds={uniqueQueueIds} currentQueueUrl={queue} currentSeasonUrl={season} currentSummonerName={summonerName} />
                              </Profile>
                              <div className="container">
                                <SeasonNav validSeasonIds={uniqueSeasonIds} currentQueueUrl={queue} currentSeasonUrl={season} currentSummonerName={summonerName} />
                              </div>
                            </AddOnDelay>
                          )
                          /**
                          return (
                            <AddOnDelay delay={1000} className="d-flex flex-grow-1 flex-column bg-grey animated fadeInDown">
                              <Profile profile={summoner}>
                                <QueueNav className="ml-auto" />
                              </Profile>
                              <div className="container">
                                <SeasonNav />
                              </div>
                            </AddOnDelay>
                          ) **/
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
