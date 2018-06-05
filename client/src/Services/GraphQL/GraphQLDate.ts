import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type represents JS Date objects",
  serialize: (value) => {
    return value.getTime()
  },
  parseValue: (value) => {
    return new Date(value)
  },
  parseLiteral: (ast, variables) => {
    switch(ast.kind) {
      case Kind.INT:
        return parseInt(ast.value)
      default:
        return null
    }
  }
})
