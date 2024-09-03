<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This Project is httpServer of [portfolio project](https://github.com/octuniv/portfolio).
Before started, You should set up the .env, .env.test files to connect postgresql and output port by referring to .env.example.
If you need, run migration by referring to below command.
You can use unittest and e2e test.

This project use dependencies below.

```bash
dependencies:
@nestjs/common 10.4.1            @nestjs/core 10.4.1              @nestjs/platform-express 10.4.1  dotenv 16.4.5                    reflect-metadata 0.2.2           typeorm 0.3.20
@nestjs/config 3.2.3             @nestjs/mapped-types 2.0.5       @nestjs/typeorm 10.0.2           pg 8.12.0                        rxjs 7.8.1                       typeorm-extension 3.6.1

devDependencies:
@faker-js/faker 8.4.1                    @types/express 4.17.21                   @typescript-eslint/eslint-plugin 7.18.0  eslint 8.57.0                            prettier 3.3.3                           ts-loader 9.5.1
@nestjs/cli 10.4.4                       @types/jest 29.5.12                      @typescript-eslint/parser 7.18.0         eslint-config-prettier 9.1.0             source-map-support 0.5.21                ts-node 10.9.2
@nestjs/schematics 10.1.3                @types/node 20.14.15                     class-transformer 0.5.1                  eslint-plugin-prettier 5.2.1             supertest 7.0.0                          tsconfig-paths 4.2.0
@nestjs/testing 10.4.1                   @types/supertest 6.0.2                   class-validator 0.14.1                   jest 29.7.0                              ts-jest 29.2.4                           typescript 5.5.4

```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Migration

```bash
# Make Migration
$ pnpm migration:generate

# Run Migration
$ pnpm migration:run

# Revert Migration
$ pnpm migration:revert

# input default data (seed)
$ pnpm seed:run
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
