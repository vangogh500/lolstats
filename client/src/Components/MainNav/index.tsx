import * as React from 'react'

interface PropType {
}

interface StateType {
}

export default class MainNav extends React.Component<PropType, StateType> {
  render() {
    return (
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container'>
          <a className='navbar-brand text-uppercase' href='#'>LoL Stats</a>
          <form className='form-inline'>
            <div className='input-group'>
              <input className='form-control text-muted' type='search' placeholder='Search' aria-label='Search'/>
              <div className='input-group-append'>
                <button className='btn btn-dark bg-primary-darken-2' type='submit'><span className="oi oi-magnifying-glass"></span></button>
              </div>
            </div>
          </form>
        </div>
      </nav>
    )
  }
}
