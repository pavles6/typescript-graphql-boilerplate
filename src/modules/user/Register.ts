import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { sendEmail } from '../../utils/send-email'
import { generateConfirmationUrl } from '../../utils/generate-confirmation-url'
import { ResolverContext } from '../../types/ResolverContext'

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Ctx() { req: { hostname } }: ResolverContext,
    @Arg('data') { email, password }: RegisterInput
  ): Promise<User> {
    const user = await User.create({ email, password }).save()

    await sendEmail(
      email,
      await generateConfirmationUrl(user.id, hostname),
      'activate-account'
    )

    return user
  }
}
