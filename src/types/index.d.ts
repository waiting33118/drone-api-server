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
