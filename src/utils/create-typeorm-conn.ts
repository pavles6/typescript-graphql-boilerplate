import { createConnection, getConnectionOptions } from 'typeorm'

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions()
  return createConnection({ ...connectionOptions, name: 'default' })
}
