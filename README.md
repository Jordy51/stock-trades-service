# Stock Trades Project

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Yarn](https://yarnpkg.com/) (Preferred package manager)
- [Docker](https://www.docker.com/) (Optional, for database services)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```

### Running the Application

#### Development Mode

```sh
yarn start:dev
```

#### Production Mode

```sh
yarn build
yarn start:prod
```

#### Running with Docker (Optional)

```sh
docker-compose up -d
```

### Environment Variables

Create a `.env` file in the root directory and configure necessary environment variables.
Example:

```env
PORT=3000
JWT_SECRET="your_jwt_secret"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
```

## API Documentation

The project uses [Swagger](https://swagger.io/) for API documentation.

1. Start the server.
2. Open your browser and navigate to:

```

http://localhost:3000/api

```

3. Explore and test API endpoints directly.

## Improvements

Here are potential improvements that can be made to the project:

- Inject user object in the auth guard to the request body so no need to pass userIds in the requests and user can only see and add own data.
- Add rate limiting to protect against abuse.
- Improve error handling with a global exception filter.

```

```
