/**
 * @file Summoner profile page
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import App from 'Scenes/SummonerProfile/App'

interface RouteProps {
  summonerName: string,
  queue: string
}
/**
 * @type Summoner profile page prop types
 */
interface PropTypes extends RouteComponentProps<RouteProps> {}

/**
 * @type Summoner profile page state types
 */
interface StateType {}

/**
 * Summoner profile page
 */
export default class SummonerProfilePage extends React.Component<PropTypes, StateType> {
  render() {
    const {match} = this.props
    return (
      <div className="d-flex flex-grow-1 flex-column bg-grey">
        <App summonerName={match.params.summonerName} queue={match.params.queue} />
      </div>
    )
  }
}
