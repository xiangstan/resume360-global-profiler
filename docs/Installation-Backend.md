# Backend Installation Guide

## Build the project from the existing code repo

```bash
# From the root directory
cd src/server
pnpm install
```

## Create the environment variables

```bash
# From the root directory
cd src/server
nano .env
```

Past the following code and modify the value within `<>` to your own.

```
BACKEND_PORT=8100
DB_NAME=resume
DB_USER=akuma
DB_PASSWD="<Database Password>"
DB_HOST=localhost
DB_PORT=5432
DB_SCHEMA="sgp"
JWT_KEY="<Salt for JWT token encryption>"
```

## Run DEV environment

```bash
# From the root directory
cd src/server
pnpm serve
```