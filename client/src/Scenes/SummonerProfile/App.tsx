import * as React from 'react'
import { ChildProps } from "react-apollo";
import { SummonerBySummonerName, InputProps, Response } from '../../Services/GraphQL/hocs/SummonerBySummonerName'
import { getProfileIconURLById } from '../../Lib/riotapi'

interface StateType {
}

class App extends React.Component<ChildProps<InputProps, Response>, StateType> {
  render() {
    const {loading, summoner, error} = this.props.data
    if(loading) {
      return null
    }
    else {
      return (
        <div className="container mt-3">
          <img src={getProfileIconURLById(summoner.profileIconId)} className="img-thumbnail p-0 w-100px h-100px rounded-circle border border-5px border-platinum" />
        </div>
      )
    }
  }
}

export default SummonerBySummonerName(App)
