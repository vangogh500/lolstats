import * as React from 'react'

interface PropType {
}

interface StateType {
}

export default class MainNav extends React.Component<PropType, StateType> {
  render() {
    return (
      <div id="main-nav" className="z-5">
        <nav className='navbar navbar-expand-sm navbar-dark bg-primary py-3'>
          <div className='container'>
            <a className='navbar-brand text-uppercase' href='#'>LoL Stats</a>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link"><span className="oi oi-globe iconic-md d-inline-flex align-middle"></span> <span className="d-inline-flex align-middle">NA</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="secondary-nav" className="bg-secondary bg-alpha-5 z-5 w-vw-100">
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
