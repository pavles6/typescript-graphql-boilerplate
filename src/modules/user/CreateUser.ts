import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class CreateUserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: RegisterInput) {
    return User.create(data).save()
  }
}
