import * as React from 'react'
import * as ReactDOM from 'react-dom'

import ApolloProvider from './Services/GraphQL/Provider'
import MainNav from './Components/MainNav/index'
import HomePage from './Scenes/Home/index'
import SummonerProfilePage from './Scenes/SummonerProfile/index'

ReactDOM.render(
  <div className='h-100 d-flex flex-column'>
    <ApolloProvider>
      <MainNav />
      <SummonerProfilePage />
    </ApolloProvider>
  </div>,
  document.getElementById('app')
)
