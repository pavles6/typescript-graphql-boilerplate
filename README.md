# typescript-graphql-boilerplate
A boilerplate for building GraphQL apps using TypeScript and TypeORM in NodeJS, inspired by  [benawad/graphql-ts-server-boilerplate](https://github.com/benawad/graphql-ts-server-boilerplate)


### Features
- TypeORM with TypeGraphQL for fast development
- Session-based authentication with redis
- Unit testing for graphql resolvers with Jest
- Support for docker containerization for production

### Setting up
- You need to create .env and .docker.env files, both should have 2 env variables: PORT and COOKIE_SECRET.

- To create docker containers as listed in docker-compose.yml, you'll have to first build this app by running `docker build -t your_container_tag .`, and then `docker-compose up`
