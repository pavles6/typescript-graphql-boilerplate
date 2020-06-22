import { Resolver, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { redis } from '../../redis'
import { forgotPasswordPrefix } from '../../utils/constants/redis-prefixes'
import { ChangePasswordInput } from './changePassword/ChangePasswordInput'

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => Boolean)
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput
  ): Promise<boolean> {
    const userId = await redis.get(forgotPasswordPrefix + token)

    if (!userId) return false

    const user = await User.findOne({ where: { id: userId } })

    if (!user) return false

    await redis.del(forgotPasswordPrefix + token)

    user.password = await bcrypt.hash(password, 12)

    await user.save()

    return true
  }
}
