import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type represents JS Date objects",
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast, variables) => {
    switch(ast.kind) {
      case Kind.INT:
        return parseInt(ast.value, 10)
      default:
        return null
    }
  }
})
