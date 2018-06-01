/**
 * @file Queue toggle component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Route, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Queue } from 'Services/GraphQL/types'


/**
 * @type Queue toggle prop types
 */
interface PropTypes {
  className?: string,
  queues: Queue[]
}
/**
 * @type Queue toggle state types
 */
interface StateType {}

/**
 * Queue toggle
 * @event Redirect if the current url does not match any of the queues provided
 */
export class QueueToggle extends React.Component<PropTypes, StateType> {
  render() {
    const {queues, className} = this.props
    const activeClassName = "active bg-ternary darken-2"
    const inactiveClassName = "bg-primary"
    return (
      <Route path='/summoner/:summonerName/:queue' render={({match}) => {
        if(!queues.find(queue => queue.url.toUpperCase() == match.params.queue.toUpperCase())) {
          return (
            <Redirect to={"/summoner/" + match.params.summonerName + "/" + queues[0].url}/>
          )
        } else {
          return (
            <div className={"btn-group btn-group-toggle " + className} data-toggle="buttons">
              {
                queues.map(({id, name, url, icon}) => (
                  <Link
                    key={"queue-toggle-" + id} to={"/summoner/" + match.params.summonerName + "/" + url}
                    className={"btn px-3 py-2 text-white " + (url.toUpperCase() == match.params.queue.toUpperCase() ? activeClassName: inactiveClassName)}>
                      <i className="material-icons align-middle">{icon}</i> <span className="align-middle">{name}</span>
                  </Link>
                ))
              }
            </div>
          )
        }
      }} />
    )
  }
}
