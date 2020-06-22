import { MiddlewareFn } from 'type-graphql'
import { ResolverContext } from '../types/ResolverContext'

export const isAuth: MiddlewareFn<ResolverContext> = async (
  { context },
  next
) => {
  if (!context.req.session!.userId)
    throw new Error('You are not authenticated.')

  return next()
}
