# DEVPOLL

### Languages:
* [Francais README](./README.md)

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
   - [Database Configuration](#1-database-configuration)
   - [Server Installation](#2-server-installation)
   - [Client Installation](#3-client-installation)
3. [Useful Commands](#useful-commands)
   - [Server](#server)
   - [Client](#client)
4. [Advanced Technical Configuration](#advanced-technical-configuration)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **MySQL** (version 5.7 or higher)
- **Node.js** (version 23.4.0 or higher)
- **npm** (version 11.0.0 or higher, usually installed with Node.js)

---

## Installation

### 1. Database Configuration

1. **Install MySQL** on your machine if not already installed. Ensure the version is 5.7 or higher.
2. **Create a MySQL database** for the project. You can use the following command in your MySQL terminal:

   ```sql
   CREATE DATABASE IF NOT EXISTS <DB_name>;
   ```

   Replace `<DB_name>` with your database name.

3. **Verify access** to the database by ensuring the MySQL user has the necessary permissions.

---

### 2. Server Installation

1. **Clone the project repository**:

   ```bash
   git clone https://github.com/ElectraVote-Web-App/DevPoll.git
   cd your-project/server
   ```

2. **Configure environment variables** for the server by copying the `.env.example` file to `.env` and filling in the necessary information:

   ```bash
   cp .env.example .env
   ```

   Example content for `.env`:

   ```env
   DB_HOST=<db_host>          # Example: localhost
   DB_USER=<user_name>        # Example: root
   DB_PASSWORD=<user_password> # Your MySQL password
   DB_NAME=<DB_name>          # Database name
   DB_PORT=3306               # Default MySQL port

   PORT=3000                  # Server port
   HOST=localhost             # Server host

   JWT_SECRET=your_jwt_secret_key # Secret key for JWT

   NODE_ENV=development       # Execution environment
   ALLOWED_ORIGINS=http://localhost:<port> # Allowed origins for CORS
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run migrations and seeders** to create tables in the database and populate it with initial data:

   ```bash
   npm run migration
   npm run seed

   # Or in a single command
   npm run setup
   ```

5. **Start the server** in development mode:

   ```bash
   npm run dev
   ```

   The server should now be accessible at `http://localhost:3000`.

---

### 3. Client Installation

1. **Navigate to the client folder**:

   ```bash
   cd ../client
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** for the client by copying the `.env.example` file to `.env` and filling in the necessary information:

   ```bash
   cp .env.example .env
   ```

   Example content for `.env`:

   ```env
   VITE_BASE_URL=http://localhost:<port>    # API URL
   VITE_FRONTEND_URL=http://localhost:<port> # Frontend URL
   ```

4. **Start the client application** in development mode:

   ```bash
   npm run dev
   ```

   The client application should now be accessible at `http://localhost:<port>`.

---

## Useful Commands

### Server

- **Start the server in development mode**: `npm run dev`
- **Run migrations**: `npm run migration`
- **Rollback the last migration**: `npm run rollback`
- **Rollback all migrations**: `npm run rollback-all`
- **Run seeders**: `npm run seed`
- **Reset the database and populate it with seeders**: `npm run reset-db`

### Client

- **Start the application in development mode**: `npm run dev`
- **Build the application for production**: `npm run build`
- **Launch a preview server**: `npm run preview`
- **Lint the code**: `npm run lint`

---

## Advanced Technical Configuration

### Database

- **Manual Migration**: If you need to create a new migration, use Sequelize CLI:
  ```bash
  npx sequelize-cli migration:generate --name your_migration_name
  ```

- **Specific Rollback**: To rollback a specific migration:
  ```bash
  npx sequelize-cli db:migrate:undo --name migration_name
  ```

### Production Environment

- **Environment Variables**: Ensure you correctly configure environment variables for production, especially `NODE_ENV=production` and secret keys.

- **Client Optimization**: Before deploying the client, run the following command to optimize the build:
  ```bash
  npm run build
  ```

---

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify that MySQL is running.
   - Ensure the connection information in `.env` is correct.

2. **Migration Errors**:
   - If a migration fails, use `npm run rollback` to undo the last migration.
   - Check the logs for more details.

3. **CORS Issues**:
   - Ensure `ALLOWED_ORIGINS` in `.env` contains the correct client URL.