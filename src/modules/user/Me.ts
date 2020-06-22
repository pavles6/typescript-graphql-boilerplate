import { Resolver, Query, Ctx, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { ResolverContext } from '../../types/ResolverContext'

import { isAuth } from '../../utils/is-auth'

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: ResolverContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined

    return await User.findOne({ where: { id: ctx.req.session!.userId } })
  }
}
