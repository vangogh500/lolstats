/**
 * @file Queue toggle component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Link } from 'react-router-dom'


/**
 * @type Queue toggle prop types
 */
interface PropTypes {
  seasons: string[]
}
/**
 * @type Queue toggle state types
 */
interface StateType {}

/**
 * Queue toggle
 */
export default class QueueToggle extends React.Component<PropTypes, StateType> {
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
