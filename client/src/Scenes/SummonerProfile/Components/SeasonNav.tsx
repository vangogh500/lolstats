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
import { Season } from 'Services/GraphQL/types'
import { createPathSummonerProfile } from 'Services/Router/pathing'

/**
 * Query string
 */
const query = gql`
  query seasonNav {
    seasons {
      id
      profile {
        name
        url
      }
    }
  }
`
/**
 * Query response data types
 */
interface QueryResponseData {
  seasons: Season[]
}
/**
 * Query variable types
 */
interface QueryVariables {}
/**
 * Summoner profile query
 */
class SeasonNavQuery extends Query<QueryResponseData, QueryVariables> {}


/**
 * @type Season nav prop types
 */
interface PropTypes {
  className?: string,
  currentSummonerName: string,
  currentQueueUrl: string,
  currentSeasonUrl: string,
  validSeasonIds: string[]
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
    const { className, validSeasonIds, currentSummonerName, currentQueueUrl, currentSeasonUrl } = this.props
    return (
      <SeasonNavQuery query={query}>
        {
          ({ loading, error, data }) => {
            if(loading) {
              return null
            } else if(error) {
              console.log(error)
              return null
            } else {
              console.log(data)
              const { seasons } = data
              const seasonIdToSeason: { [id: string]: Season } = seasons.reduce((acc, season) => ({ ...acc, [season.id]: season }), {})
              const seasonsToDisplay = validSeasonIds.reduce((acc, id) => ([...acc, seasonIdToSeason[id]]), [])
              if(!seasonsToDisplay.find(season => season.profile.url.toUpperCase() == currentSeasonUrl.toUpperCase())) {
                return (
                  <Redirect to={createPathSummonerProfile(currentSummonerName, seasonsToDisplay[0].profile.url, currentQueueUrl) }/>
                )
              } else {
                return (
                  <nav className="nav nav-tabs">
                    {
                      seasonsToDisplay.map(({ id, profile }) => (
                        <Link key={"queue-nav-" + id} to={createPathSummonerProfile(currentSummonerName, profile.url, currentQueueUrl) }
                          className="nav-item nav-link" href="#">{profile.name}</Link>
                      ))
                    }
                  </nav>
                )
              }
            }
          }
        }
      </SeasonNavQuery>
    )
  }
}
