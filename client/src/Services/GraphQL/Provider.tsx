import * as React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import schema from './mock/schema'

interface PropType {
  children?: React.ReactNode
}

interface StateType {}

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
})

export default class GraphQLProvider extends React.Component<PropType, StateType> {
  render() {
    return (
      <ApolloProvider client={client}>
        { this.props.children }
      </ApolloProvider>
    )
  }
}
