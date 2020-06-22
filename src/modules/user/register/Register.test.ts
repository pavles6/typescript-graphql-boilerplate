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

const registerMutation = `mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    email
  }
}
`

describe('Register', () => {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  it('creates a user', async () => {
    const response = await gqlCall({
      source: registerMutation,
      variableValues: {
        data: userData,
      },
      contextValue: { req: { hostname: 'locahost' } as any, res: {} as any },
    })

    const { email, id } =
      (await User.findOne({
        where: { email: userData.email },
      })) || {}

    expect(response).toMatchObject({ data: { register: { email, id } } })
  })
})
