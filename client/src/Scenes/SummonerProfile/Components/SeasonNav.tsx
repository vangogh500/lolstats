/**
 * @file Season nav component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Link } from 'react-router-dom'


/**
 * @type Season nav prop types
 */
interface PropTypes {
  seasons: string[]
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
    const {seasons} = this.props
    return (
      <nav className="nav nav-tabs">
        {
          seasons.map((season) => (
            <a className="nav-item nav-link" href="#">{season}</a>
          ))
        }
      </nav>
    )
  }
}
