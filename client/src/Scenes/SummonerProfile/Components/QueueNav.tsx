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
 * @type Queue nav prop types
 * @prop {string} className
 * @prop {Queue[]} queues
 * @prop {(queueUrl: string) => string} urlBuilder Builds link url from queueUrl
 * @prop {(queue: Queue) => boolean} activeValidator Determines whether the queue is active
 */
interface PropTypes {
  className?: string,
  queues: Queue[],
  urlBuilder: (queueUrl: string) => string,
  activeValidator: (queue: Queue) => boolean
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
    const { className, queues, urlBuilder, activeValidator } = this.props
    return (
      <div className={"btn-group btn-group-toggle " + className} data-toggle="buttons">
        {
          queues.map(({id, profile}) => (
            <Link
              key={"queue-nav-" + id} to={urlBuilder(profile.url)}
              className={"btn px-3 py-2 text-white " + (activeValidator({id, profile}) ? QueueNav.ACTIVE_LINK_CLASS : QueueNav.INACTIVE_LINK_CLASS)}>
                <i className="material-icons align-middle">{profile.icon}</i> <span className="align-middle">{profile.name}</span>
            </Link>
          ))
        }
      </div>
    )
  }
}
