import { v4 } from 'uuid'
import { redis } from '../redis'
import { getFullHostname } from './get-full-hostname'
import { emailConfirmationPrefix } from './constants/redis-prefixes'

export const generateConfirmationUrl = async (userId: string, host: string) => {
  const confirmationToken = v4()

  await redis.set(
    emailConfirmationPrefix + confirmationToken,
    userId,
    'ex',
    60 * 60 * 24
  ) // will expire in 1 day

  return `${getFullHostname(host)}/user/confirm/${confirmationToken}`
}
