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


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
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

