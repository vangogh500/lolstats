/**
 * @file Summoner search bar
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Redirect } from 'react-router'

/**
 * @type Summoner search bar state types
 */
interface PropType {}
/**
 * @type Summoner search bar state types
 * @prop {string} value search value
 * @prop {boolean} submitted whether the search has been submitted
 */
interface StateType {
  value: string,
  submitted: boolean
}
/**
 * Summoner search bar
 * @event Redirect Redirects to /summoner/:summonerName/solo
 */
export default class SummonerSearch extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      value: '',
      submitted: false
    }
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value })
  }
  handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    this.setState({ submitted: true })
  }
  render() {
    const {value, submitted} = this.state
    if(submitted) {
      return (
        <Redirect to={'/summoner/' + value + '/solo'} />
      )
    } else {
      return (
        <form className='w-50 mt-5' onSubmit={(e) => this.handleSubmit(e)}>
          <div className='input-group'>
            <input
              className='form-control text-muted'
              type='search' placeholder='Search'
              aria-label='Search'
              value={this.state.value}
              onChange={(e) => this.handleChange(e)} />
            <div className='input-group-append'>
              <button className='btn btn-dark bg-primary-darken-2' type='submit'><i className="material-icons">search</i></button>
            </div>
          </div>
        </form>
      )
    }
  }
}
