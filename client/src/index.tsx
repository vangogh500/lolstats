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
