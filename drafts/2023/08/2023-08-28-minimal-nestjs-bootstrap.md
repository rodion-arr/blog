# Minimal Nest.js setup for API project

When starting new enterprize-level Nest.js-based project it is fat not enough to run `$ nest new` command to cover minimal infra requirements.
Usually initial framework setup misses next things for such project:

- Config for docker including data base and cache for local development
- `.env` file setup
- Validation pipeline and DTOs
- DB migrations
- Authentication strategy setup
- Async logger with request ID generation
- Graceful shutdown
- Swagger docs

To cover these requirements usually it is required to pull a bunch of additional packages such as `typeorm`, `passport`, `class-validator`, `cache-manager`, etc.

I've created a repo with working example of Nest.js application covering all the items above, take a look - <a href="https://github.com/rodion-arr/nestjs-starter-kit/" target="_blank">nestjs-starter-kit</a>.

Lets go over these requirements and see how they are solved in `nestjs-starter-kit`.

## Docker setup

For this example we will require only Node.js running on local machine, all other instances will be run in Docker: Postgres DB, Redis for cache and Mailhog for mailtraping.

Example of `docker-compose.yml`:

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2F.docker-node-api%2Fdocker-compose.yml&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

## Env file setup

According to 12 factor app - it is recommended to store application config in Environment Variables. This technique allows you to build the bundle once and deploy it to multiple target servers (e.g. QA, Staging, Prod) without code modifications. Each target environment will have different configuration values which application retrieves from environment variables.

Nest.js does not provide `.env` file support right after installation - it is required to add more configs manually.

This requirement covered in `app.module.ts` and `configuration.ts`:
<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Fapp.module.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Fservices%2Fapp-config%2Fconfiguration.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

## Validation vie DTO files

Nest.js does not provide validation functionality right after installation - it is required to configure Validation pipeline.

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Fmain.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

## DB migrations

TypeORM DB migrations are already set up for you in `./api/src/db/migrations` folder.

To generate new migration run:

```bash
npm run migrations:new -- src/db/migrations/Roles
```

To apply migrations run:

```bash
npm run migrations:up
```

To revert migrations run:

```bash
npm run migrations:revert
```

### Redis cache

[cache-manager](https://github.com/BryanDonovan/node-cache-manager#readme) package with Redis store is available in `app-cache.module.ts` file.

So it is possible to use `CacheInterceptor` above your controller methods or classes:

```typescript
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getUsers() {}
```

Or inject `CacheManager` and use it directly:

```typescript
constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

await this.cacheManager.get('key');
```

### JWT auth with passport.js

JWT authentication is configured and available to use.

User registration, login and JWT-protected API examples were added in `user.controller.ts`

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Fuser%2Fuser.controller.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

### Logger with Trace ID generation

[Pino](https://github.com/pinojs/pino) added as application logger to utilize async way of logging without blocking main thread.

Each request to API is signed with unique `TraceID` and passed to logger via [AsyncLocalStorage](https://nodejs.org/api/async_context.html#class-asynclocalstorage).

Code can be found in `async-storage.middleware.ts` and `app-logger.service.ts`

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Fglobal%2Fmiddleware%2Fasync-storage%2Fasync-storage.middleware.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

<script src="https://emgithub.com/embed-v2.js?target=https%3A%2F%2Fgithub.com%2Frodion-arr%2Fnestjs-starter-kit%2Fblob%2Fmain%2Fapi%2Fsrc%2Flogger%2Fservices%2Fapp-logger%2Fapp-logger.service.ts&style=default&type=code&showBorder=on&showLineNumbers=on&showFileMeta=on&showFullPath=on&showCopy=on"></script>

<img width="799" alt="TraceID in logs example" src="https://user-images.githubusercontent.com/5843270/143482882-84c51e0e-0e54-407b-8ed7-cf7b8536f7e3.png">

### Graceful shutdown

Nest.js [shutdown hooks](https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown) are enabled.

This starter kit subscribed to `OnModuleDestroy` event and [disconnects](./api/src/app-cache/app-cache.module.ts) from Redis gracefully.

### Automatic APIs documentation with Swagger

Nest.js swagger module configured with the use of [Swagger CLI plugin](https://docs.nestjs.com/openapi/cli-plugin).

API docs are generated with the start of app server automatically and available at [http://localhost:3000/api](http://localhost:3000/api):

<img width="1485" alt="Swagger doc generated" src="https://user-images.githubusercontent.com/5843270/143483373-a0f3fd48-4f27-4d53-9b8f-6b80bc147d48.png">

## Summary

This post described what is missing in default Nest.js installation for enterprize-level API projects, reviewed <a href="https://github.com/rodion-arr/nestjs-starter-kit/" target="_blank">nestjs-starter-kit</a> project and showed how this project could help you in quick bootstrapping Nest.js APIs.