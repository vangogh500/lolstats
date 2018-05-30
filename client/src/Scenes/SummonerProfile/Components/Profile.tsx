import * as React from 'react'
import { getProfileIconURLById } from '../../../Lib/riotapi'

interface PropTypes {
  profile: {
    summonerName: string,
    profileIconId: string
  }
}

interface StateType {
}

export default class SummonerProfile extends React.Component<PropTypes, StateType> {
  render() {
    const {profile} = this.props
    return (
      <div className="bg-center bg-cover pt-40px" style={{ backgroundImage: 'url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg)' }}>
        <div className="container">
          <div className="d-flex flex-row align-items-center my-4">
            <img src={getProfileIconURLById(profile.profileIconId)} className="img-thumbnail p-0 w-100px h-100px rounded-circle border border-5px border-platinum" />
            <h4 className="text-white ml-3">{profile.summonerName}</h4>
            <div className="btn-group btn-group-toggle ml-auto" data-toggle="buttons">
              <label className="btn bg-ternary darken-2 p-3 text-white active">
                <input type="radio" name="options" autoComplete="off" checked /><span className="oi oi-person"></span> Solo
              </label>
              <label className="btn bg-primary p-3 text-white">
                <input type="radio" name="options" autoComplete="off" /><span className="oi oi-people"></span> Flex
              </label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
