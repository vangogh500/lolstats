import * as React from 'react'
import App from './App'

interface PropType {
}

interface StateType {
}

export default class SummonerProfilePage extends React.Component<PropType, StateType> {
  render() {
    return (
      <div className="d-flex flex-grow-1 flex-column bg-grey" id="summoner-profile-container">
        <App summonerName="Vangogh" />
      </div>
    )
  }
}
