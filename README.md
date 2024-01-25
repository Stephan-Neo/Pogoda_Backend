## Quick launch via docker
```bash
docker-compose up -d --build
```
Схема бд лежит в /docs/db.plantuml

#### Если запуск не через docker, то не забудьте поменять postgres.local на localhost в .env файле

#### Swagger: http://localhost:3000/docs

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
