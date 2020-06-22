import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { User } from '../../../entity/User'

@ValidatorConstraint({ name: 'IsEmailAlreadyExist', async: false })
export class IsEmailAlreadyExist implements ValidatorConstraintInterface {
  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => {
      if (user) return false
      return true
    })
  }
}
