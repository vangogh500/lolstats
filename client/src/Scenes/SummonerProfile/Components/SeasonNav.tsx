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
 * @type Season nav prop types
 */
interface PropTypes {
  className?: string,
  seasons: Season[],
  urlBuilder: (seasonUrl: string) => string
}
/**
 * @type Season nav state types
 * @prop {string} className
 * @prop {Season[]} seasons
 * @prop {(seasonUrl: string) => string} urlBuilder Builds link url from seasonUrl
 */
interface StateType {}

/**
 * Season nav
 */
export default class SeasonNav extends React.Component<PropTypes, StateType> {
  render() {
    const { className, seasons, urlBuilder } = this.props
    console.log(urlBuilder("test"))
    return (
      <nav className="nav nav-tabs">
        {
          seasons.map(({ id, profile }) => (
            <Link key={"season-nav-" + id} to={urlBuilder(profile.url)}
              className="nav-item nav-link" href="#">{profile.name}</Link>
          ))
        }
      </nav>
    )
  }
}
