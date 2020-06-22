export const getFullHostname = (host: string): string => {
  let protocol = 'http'
  let port = `:${process.env.PORT}`

  if (process.env.NODE_ENV === 'production') {
    protocol = 'https'
    port = ''
  }

  return `${protocol}://${host}${port}`
}
