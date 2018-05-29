import * as React from 'react'

interface PropType {
}

interface StateType {
}

export default class MainNav extends React.Component<PropType, StateType> {
  render() {
    return (
      <nav className='navbar navbar-dark bg-prm-color-dark'>
        <div className='container'>
          <a className='navbar-brand' href='#'>LoL Stats</a>
        </div>
      </nav>
    )
  }
}
