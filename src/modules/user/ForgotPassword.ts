import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { sendEmail } from '../../utils/send-email'
import { User } from '../../entity/User'
import { v4 } from 'uuid'
import { redis } from '../../redis'
import { getFullHostname } from '../../utils/get-full-hostname'
import { ResolverContext } from '../../types/ResolverContext'
import { forgotPasswordPrefix } from '../../utils/constants/redis-prefixes'

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() ctx: ResolverContext
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) return false

    const token = v4()
    await redis.set(forgotPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24)

    await sendEmail(
      email,
      `${getFullHostname(ctx.req.hostname)}/user/change-password/${token}`,
      'forgot-password'
    )
    return true
  }
}
