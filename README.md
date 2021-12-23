# Backend Server of Drone Cloud Platform

![Github Action](https://github.com/waiting33118/drone-api-server/actions/workflows/dockerCICD.yml/badge.svg)
![Docker pull](https://img.shields.io/docker/pulls/waiting33118/drone-cloud-backend)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)

This is the backend server of [Drone Cloud Platform](https://github.com/waiting33118/drone-cloud-platform3.0), used for handle drone communication between app and frontend

# Project Setup

## Install dependencies

```bash
npm install
```

### Config Environment Variables

Copy env example file and rename to `.env`

```bash
cp .env.example .env
```

Fill in credentials

```bash
FRONTEND_URL=http://localhost:8080
BACKEND_SERVICE_SERVICE_PORT=3030
RABBITMQ_SERVICE_SERVICE_HOST=localhost
RABBITMQ_SERVICE_SERVICE_PORT=5672
RABBITMQ_SERVICE_USER=your_rabbitmq_user
RABBITMQ_SERVICE_PASSWORD=your_rabbitmq_password
MYSQL_SERVICE_SERVICE_HOST=your_mysql_host
MYSQL_SERVICE_SERVICE_PORT=3306
MYSQL_SERVICE_USER=your_mysql_user
MYSQL_SERVICE_PASSWORD=your_mysql_password
JWT_TOKEN_SECRET=your_jwt_secret
```

### Run project

```bash
npm run serve
```

_The server will now run on http://localhost:3030_

### Build project

```bash
npm run build
```
