import { gqlCall } from '../../../test-utils/graphql-call'
import faker from 'faker'
import { User } from '../../../entity/User'
import { createTypeormConn } from '../../../utils/create-typeorm-conn'
import { Connection } from 'typeorm'

let conn: Connection

beforeAll(async () => {
  conn = await createTypeormConn()
})

afterAll(async () => {
  await conn!.close()
})

const meQuery = `
{
    me {
      id
      email
    }
}
`

describe('Me', () => {
  it('gets user data', async () => {
    const dbUser = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    }).save()

    const res = await gqlCall({
      source: meQuery,
      contextValue: {
        req: { session: { userId: dbUser.id } } as any,
        res: {} as any,
      },
    })

    expect(res).toMatchObject({
      data: { me: { id: dbUser.id, email: dbUser.email } },
    })
  })

  it('returns a null', async () => {
    const response = await gqlCall({
      source: meQuery,
    })

    expect(response).toMatchObject({
      data: { me: null },
    })
  })
})
