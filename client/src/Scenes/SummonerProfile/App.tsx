/**
 * @file Summoner profile app
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { ChildProps } from "react-apollo";
import { SummonerBySummonerName, InputProps, Response } from '../../Services/GraphQL/hocs/SummonerBySummonerName'
import { getProfileIconURLById } from '../../Lib/riotapi'

import Profile from 'Scenes/SummonerProfile/Components/Profile'

/**
 * Summoner profile app prop types
 */
interface PropTypes extends ChildProps<InputProps, Response> {}

/**
 * Summoner profile app state types
 */
interface StateType {}

/**
 * Summoner profile app
 */
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
