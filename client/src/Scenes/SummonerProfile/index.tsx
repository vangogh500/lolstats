import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import App from './App'

interface RouteProps {
  summonerName: string
}
interface PropTypes extends RouteComponentProps<RouteProps> {
}

interface StateType {}

export default class SummonerProfilePage extends React.Component<PropTypes, StateType> {
  render() {
    const {match} = this.props
    return (
      <div className="d-flex flex-grow-1 flex-column bg-grey">
        <App summonerName={match.params.summonerName} />
      </div>
    )
  }
}
