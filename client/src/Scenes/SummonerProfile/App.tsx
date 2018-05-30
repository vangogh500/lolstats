import * as React from 'react'
import { ChildProps } from "react-apollo";
import { SummonerBySummonerName, InputProps, Response } from '../../Services/GraphQL/hocs/SummonerBySummonerName'
import { getProfileIconURLById } from '../../Lib/riotapi'

import Profile from './Components/Profile'

interface PropTypes extends ChildProps<InputProps, Response> {}

interface StateType {}

class App extends React.Component<PropTypes, StateType> {
  render() {
    const {loading, summoner, error} = this.props.data
    if(loading) {
      return null
    }
    else {
      return (
        <Profile profile={summoner} />
      )
    }
  }
}

export default SummonerBySummonerName(App)
