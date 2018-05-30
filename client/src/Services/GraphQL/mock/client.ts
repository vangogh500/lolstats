/**
 * @file Mock client
 * @author Kai Matsuda
 * @copyright Kai Matusuda 2018
 * @version 0.0.1
 */

import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';

import schema from './mock/schema'

/**
 * @const {ApolloClient} mockClient Mock apollo client for frontend testing
 */
export default const mockClient = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache()
})
