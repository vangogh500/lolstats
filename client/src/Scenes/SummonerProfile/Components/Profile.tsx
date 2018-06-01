import * as React from 'react'
import { Summoner } from 'Services/GraphQL/types'

import { getProfileIconURLById } from '../../../Lib/riotapi'

interface PropTypes {
  profile: Summoner,
  children?: React.ReactNode
}

interface StateType {
}

export default class SummonerProfile extends React.Component<PropTypes, StateType> {
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
