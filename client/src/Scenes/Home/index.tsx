import * as React from 'react'
import SummonerSearch from './Components/SummonerSearch'

/**
 * @type Home page prop types
 */
interface PropType {}
/**
 * @type Home page state types
 */
interface StateType {}

/**
 * Home page component
 */
export default class HomePage extends React.Component<PropType, StateType> {
  render() {
    return (
      <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column bg-primary" id="home-page-container">
        <h1 className="display-3 text-white mb-5">Begin the Climb</h1>
        <SummonerSearch />
      </div>
    )
  }
}
