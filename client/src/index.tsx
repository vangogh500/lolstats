/**
 * @file Main
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ApolloProvider from './Services/GraphQL/Provider'
import Router from './Services/Router/Provider'

ReactDOM.render(
  <ApolloProvider>
    <Router />
  </ApolloProvider>,
  document.getElementById('app')
)
