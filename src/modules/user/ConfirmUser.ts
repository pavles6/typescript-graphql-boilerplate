import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { ResolverContext } from '../../types/ResolverContext'
import { redis } from '../../redis'
import { emailConfirmationPrefix } from '../../utils/constants/redis-prefixes'

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg('token') token: string,
    @Ctx() ctx: ResolverContext
  ): Promise<boolean> {
    const userId = await redis.get(emailConfirmationPrefix + token)

    if (!userId) return false

    await User.update({ id: userId }, { confirmed: true })

    await redis.del(emailConfirmationPrefix + token)

    ctx.req.session!.userId = userId

    return true
  }
}
