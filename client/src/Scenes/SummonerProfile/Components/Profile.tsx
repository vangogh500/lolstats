/**
 * @file Profile component
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'
import { SummonerProfile } from 'Services/GraphQL/types'

import { getProfileIconURLById } from '../../../Lib/riotapi'

/**
 * @type PropTypes
 * @prop {SummonerProfile} profile
 * @prop {React.ReactNode} children
 */
interface PropTypes {
  profile: SummonerProfile,
  children?: React.ReactNode
}
/**
 * @type StateTypes
 */
interface StateType {}

/**
 * Summoner profile component
 */
export default class extends React.Component<PropTypes, StateType> {
  render() {
    const {profile, children} = this.props
    return (
      <div className="bg-center bg-cover pt-40px" style={{ backgroundImage: 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg)' }}>
        <div className="container">
          <div className="d-flex flex-row align-items-center my-4">
            <img src={getProfileIconURLById(profile.profileIconId)} className="img-thumbnail p-0 w-100px h-100px rounded-circle border border-5px border-platinum" />
            <h4 className="text-white ml-3">{profile.name}</h4>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
