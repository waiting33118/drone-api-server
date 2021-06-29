export interface ENV_VARIABLE {
  HTTP_PORT?: string
  HTTPS_PORT?: string
  NODE_ENV?: string
  RABBITMQ_HOSTNAME?: string
  RABBITMQ_USERNAME?: string
  RABBITMQ_PASSWORD?: string
  RABBITMQ_PORT?: string
  MYSQL_HOSTNAME?: string
  MYSQL_PORT?: string
  MYSQL_USERNAME?: string
  MYSQL_PASSWORD?: string
  JWT_TOKEN_SECRET?: string
  PRIVATE_KEY_PATH?: string
  CERTIFICATE_PATH?: string
}

export type SignupField = {
  email: string
  password: string
  checkPassword: string
  droneId: string
}

export type LoginField = {
  email: string
  password: string
}

export type TokenPayload = {
  uuid: string
}

export type CookiePayload = {
  access_token: string
  refresh_token: string
}

export type EditIDPayload = {
  droneId: string
}
