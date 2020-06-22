import { graphql, GraphQLSchema } from 'graphql'
import { createSchema } from '../utils/create-graphql-schema'
import { ResolverContext } from '../types/ResolverContext'

interface Options {
  source: string
  variableValues?: {
    [key: string]: any
  }
  contextValue?: ResolverContext
}

let schema: GraphQLSchema

export const gqlCall = async ({
  source,
  variableValues,
  contextValue,
}: Options) => {
  if (!schema) schema = await createSchema
  return graphql({
    schema,
    source,
    variableValues,
    contextValue,
  })
}
