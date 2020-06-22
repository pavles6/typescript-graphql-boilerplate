import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import bcrypt from 'bcryptjs'
import { ResolverContext } from '../../types/ResolverContext'

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ResolverContext
  ): Promise<User | null> {
    if (ctx.req.session!.userId) return null

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return null
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return null
    }

    if (!user.confirmed) throw new Error('You have not confirmed your account.')

    ctx.req.session!.userId = user.id

    return user
  }
}
