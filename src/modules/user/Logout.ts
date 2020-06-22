import { Resolver, Mutation, Ctx } from 'type-graphql'
import { authCookieName } from '../../utils/constants/other'
import { ResolverContext } from '../../types/ResolverContext'

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ResolverContext): Promise<Boolean> {
    if (ctx.req.session!.userId)
      return new Promise((resolve, reject) => {
        ctx.req.session?.destroy((err) => {
          if (err) console.log(err)
          return reject(false)
        })

        ctx.res.clearCookie(authCookieName)

        return resolve(true)
      })

    return false
  }
}
