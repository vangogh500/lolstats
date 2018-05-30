import * as React from 'react'

interface PropType {
}

interface StateType {
}

export default class HomePage extends React.Component<PropType, StateType> {
  render() {
    return (
      <div className="d-flex flex-grow-1 align-items-center justify-content-center flex-column bg-primary mt--40px" id="home-page-container">
        <h1 className="display-3 text-white mb-5">Begin the Climb</h1>
        <form className='w-50 mt-5'>
            <div className='input-group'>
              <input className='form-control text-muted' type='search' placeholder='Search' aria-label='Search'/>
              <div className='input-group-append'>
                <button className='btn btn-dark bg-primary-darken-2' type='submit'><span className="oi oi-magnifying-glass"></span></button>
              </div>
            </div>
          </form>
      </div>
    )
  }
}
