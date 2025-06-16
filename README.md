# Home Library

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/).

## Downloading

```
git clone https://github.com/salandil/nodejs2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Setting up env

```
cp .env.example .env
```

## Running application in docker

```
npm run docker:start
```

## Application launching

Wait until the app is loaded. After all resources are mapped there would be a message `Nest application successfully started`.

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running Library App locally

For local run PostgreSQL installed on your computer is required
[Intall PostgreSQL](https://www.postgresql.org/docs/current/tutorial-install.html).

Don't forget to change values at least for `POSTGRES_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD` in your .env file according to your local setting

## Run Typeorm migrations

```
npm run typeorm:run-migrations
```

## Start the Library App

```
npm run start:dev
```

## Testing

After application running open new terminal and enter:

To run all tests with authorization

```
npm run test:auth
```

To run only one of all test suites

```
npm run test:auth -- <path to suite>
```

For example:

```
npm run test:auth -- users.e2e.spec.ts
```

# Logging Service

Logs directory is specified in `LOGS_LOG_FOLDER` and it is `logs` by default<br>
`LOGS_MAX_FILE_SIZE` (in KB) and `LOGS_LOG_LEVEL` are specified in .env file also. By default they are 256 KB and 2 log level.<br>
Logs are created in files named log\_{num}.txt and error\_{num}.txt.<br>

## Logs are sorted in the following way:

- 500 and higher value of response code logs are saved in error\_{num}.txt file, as well as `uncaughtException` and `unhandledRejection` errors.
- from 400 to 500 not including response codes are logged in log\_{num}.txt file.
- Request and response data of successful requests is logged in log\_{num}.txt file.
  File rotation happens when log (error log) file reaches maximum size (a new log file created).<br>
  `LOG_LEVEL` is responsible for collecting logs of specific level (and all previous level including).
- 0 value will log only errors (500+ errors and unhandled rejections, uncaught exceptions) will be saved.
- 1 value adds warning logs (400 - 500 not including response codes) to errors.
- 2 value adds basic logs (successful responses and requests data) to the previous scope of logs.

In Docker logs are stored in the volume `app_logs`. You can open your docker UI interface and check it's values throw it.

## Security scanning

```
npm run docker:security-scan
```

## Docker images listing

```
npm run docker:list-images
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

# Project supports the following resources:

## Auth

- `POST /auth/signup`: Sign up for a new user using login password
- `POST /auth/login`: Sign in with login and password
- `POST /auth/refresh`: Get a new accessToken and refreshToken

## Users

- `GET /user`: Get all users.
- `POST /user`: Create a new user.

- `GET /user/:id`: Get user by id.
- `PATCH /user/:id`: Update user by id.
- `DELETE /user/:id`: Delete user by id.

## Artists

- `GET /artist`: Get all artists.
- `POST /artist`: Create a new artist.

- `GET /artist/:id`: Get artist by id.
- `PATCH /artist/:id`: Update artist by id.
- `DELETE /artist/:id`: Delete artist by id.

## Albums

- `GET /album`: Get all albums.
- `POST /album`: Create a new album.\

- `GET /album/:id`: Get album by id.
- `PATCH /album/:id`: Update album by id.
- `DELETE /album/:id`: Delete album by id.

## Tracks

- `GET /track`: Get all tracks.
- `POST /track`: Create a new track.

- `GET /track/:id`: Get track by id.
- `PATCH /track/:id`: Update track by id.
- `DELETE /track/:id`: Delete track by id.

## Favorites

- `GET /favs`: Get all favorites.
- `POST /favs/track/:id`: Add track to favorites.
- `DELETE /favs/track/:id`: Delete track from favorites.
- `POST /favs/album/:id`: Add album to favorites.
- `DELETE /favs/album/:id`: Delete album from favorites.
- `POST /favs/artist/:id`: Add artist to favorites.
- `DELETE /favs/artist/:id`: Delete artist from favorites.
