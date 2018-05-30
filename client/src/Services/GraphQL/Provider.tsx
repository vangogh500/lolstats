/**
 * @file GraphQL provider
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import * as React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import mockClient from './mock/client'

/**
 * @type GraphQL Provider prop types
 * @prop
 */
interface PropType {
  children?: React.ReactNode
}
/**
 * @type GraphQL Provider state types
 */
interface StateType {}

/**
 * GraphQL Provider
 */
export default class GraphQLProvider extends React.Component<PropType, StateType> {
  render() {
    return (
      <ApolloProvider client={mockClient}>
        { this.props.children }
      </ApolloProvider>
    )
  }
}
