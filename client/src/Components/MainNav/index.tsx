/**
 * @file MainNav
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */
import * as React from 'react'
import { Route, Switch } from 'react-router-dom'


/**
 * @type PropType
 *
 */
interface PropType {
  primaryClassName: string,
  secondaryClassName: string
}

interface StateType {
}

export default class MainNav extends React.Component<PropType, StateType> {
  render() {
    const { primaryClassName, secondaryClassName } = this.props
    return (
      <div id="main-nav" className="z-5">
        <nav className={'navbar navbar-expand-sm navbar-dark bg-primary ' + primaryClassName}>
          <div className='container'>
            <a className='navbar-brand text-uppercase' href='#'>LoL Stats</a>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link"><span className="oi oi-globe iconic-md d-inline-flex align-middle"></span> <span className="d-inline-flex align-middle">NA</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="secondary-nav" className={"bg-secondary w-vw-100 " + secondaryClassName}>
          <div className="container">
            <nav className="nav">
              <a className="nav-item nav-link text-light active" href="#">Summoner</a>
              <a className="nav-item nav-link text-light" href="#">Champion</a>
              <a className="nav-item nav-link text-light" href="#">Leader Board</a>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
