# Stage 1 - building the code with dev dependencies
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 setting up for production
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

ENV NODE_ENV production

EXPOSE 4000
CMD node dist/src/index.js