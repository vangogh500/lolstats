import * as React from 'react'
import { Redirect } from 'react-router'

interface PropType {
}

interface StateType {
  value: string,
  submitted: boolean
}

export default class SummonerSearch extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      value: '',
      submitted: false
    }
  }
  handleChange(e: any) {
    this.setState({ value: e.target.value })
  }
  handleSubmit(e: any) {
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
              <button className='btn btn-dark bg-primary-darken-2' type='submit'><span className="oi oi-magnifying-glass"></span></button>
            </div>
          </div>
        </form>
      )
    }
  }
}
