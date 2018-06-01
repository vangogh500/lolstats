/**
 * @file Season nav component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Query } from "react-apollo"
import gql from 'graphql-tag'
import { Season, SummonerSeasonQueueStats } from 'Services/GraphQL/types'

/**
 * Query string
 */
const query = gql`
  query seasonNav($summonerName: String!) {
    summonerSeasonQueueStats(summonerName: $summonerName) {
      queueId
      seasonId
      accountId
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
class SeasonNavQuery extends Query<QueryResponseData, QueryVariables> {}


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
        <SeasonNavQuery query={query} variables={{summonerName: match.params.summonerName}}>
          {
            ({ loading, error, data}) => {
              if(loading) {
                return null
              } else if(error) {
                console.log(error)
              } else {
                const { seasons, summonerSeasonQueueStats } = data

                const seasonMap: { [id: string]: Season } = seasons.reduce((acc, season) => ({ ...acc, [season.id]: season }), {})
                const applicableSeasonIds: string[] = Object.keys(
                  summonerSeasonQueueStats.reduce((acc, stats) => ({ ...acc, [stats.seasonId]: true }), {})
                )
                const applicableSeasons = applicableSeasonIds.map(id => seasonMap[id])
                if(!applicableSeasons.find(season => season.url.toUpperCase() == match.params.season.toUpperCase())) {
                  return (
                    <Redirect to={"/summoner/" + match.params.summonerName + "/" + applicableSeasons[0].url + "/" + match.params.queue }/>
                  )
                } else {
                  return (
                    <nav className="nav nav-tabs">
                      {
                        applicableSeasons.map(({ id, name, url }) => (
                          <Link key={"queue-nav-" + id} to={"/summoner/" + match.params.summonerName + "/" + url + "/" + match.params.queue }
                            className="nav-item nav-link" href="#">{name}</Link>
                        ))
                      }
                    </nav>
                  )
                }
              }
            }
          }
        </SeasonNavQuery>

      )} />
    )
  }
}
