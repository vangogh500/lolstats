/**
 * @file Router
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import { Route, Switch } from 'react-router-dom'

import MainNav from 'Components/MainNav/index'
import HomePage from 'Scenes/Home/index'
import SummonerProfilePage from 'Scenes/SummonerProfile/index'
import {PATH_SUMMONER_PROFILE} from 'Services/Router/pathing'

/**
 * @type Router prop types
 */
interface PropTypes {}
/**
 * @type Router state types
 */
interface StateTypes {}

/**
 * Router
 */
export default class RouterProvider extends React.Component<PropTypes, StateTypes> {
  render() {
    return (
      <Router history={createHashHistory()}>
        <div className="h-100 d-flex flex-column">
          <Switch>
            <Route exact path='/' render={() => <MainNav primaryClassName='py-3' secondaryClassName='bg-alpha-5 mb--40px' />} />
            <Route render={() => <MainNav primaryClassName='' secondaryClassName='bg-alpha-5 mb--40px' />} />
          </Switch>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path={PATH_SUMMONER_PROFILE} component={SummonerProfilePage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
