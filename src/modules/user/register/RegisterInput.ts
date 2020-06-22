import { Length, IsEmail, Validate } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { IsEmailAlreadyExist } from './isEmailAlreadyExist'
import { PasswordInput } from '../shared/PasswordInput'

@InputType()
export class RegisterInput extends PasswordInput {
  @Length(3, 255)
  @IsEmail()
  @Validate(IsEmailAlreadyExist, {
    message: 'Email already exists in database.',
  })
  @Field()
  email: string
}
