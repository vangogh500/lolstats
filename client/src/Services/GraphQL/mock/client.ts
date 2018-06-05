/**
 * @file Mock client
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import ApolloClient from 'apollo-client'
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import schema from 'Services/GraphQL/mock/schema'


/**
 * @const {ApolloClient} mockClient Mock apollo client for frontend testing
 */
export default new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
})
