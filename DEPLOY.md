# Deploy

> [!info]
> This is a guide to deploy the ERIC API in an ARM processor (e.g. raspberry pi)

## Docker-compose

### .env

```bash
MIX_ENV=prod
APP_NAME=ERIC_api
SECRET_KEY_BASE=<SECRET_KEY_BASE>

DB_HOST=eric_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=eric

```

### compose.yml

```yaml
services:
  db:
    image: postgres:latest
    container_name: eric_db
    restart: always
    environment:
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_NAME}
    volumes:
      - db:/var/lib/postgres/data
    networks:
      - eric_network
  eric_api:
    build:
      context: ERIC_api
      args:
        MIX_ENV: prod
        APP_NAME: eric_api
    container_name: eric_api
    restart: always
    env_file: .env
    ports:
      - 4000:4000
    depends_on:
      - db
    networks:
      - eric_network
volumes:
  db:
networks:
  eric_network:
    driver: bridge
```

## Run

clone the repo in the folder where `compose.yml` is located and run:

```bash
docker-compose up -d
```

> [!info]
> The build docker image for non ARM processors is available on [Docker Hub](https://hub.docker.com/r/boterop/eric_api)
