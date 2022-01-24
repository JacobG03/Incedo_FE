export interface IMeInfo {
  username: string,
  is_verified: boolean,
  avatar_url: string,
  email: string
}

export interface IMe {
  meInfo: IMeInfo | null,
  pending: boolean,
  finished: boolean
  errors: string[] | null
}

export interface IState {
  me: IMe,
  theme: IThemeState,
  alerts: IAlerts
}

export interface IFormError {
  type: string,
  loc: string[],
  msg: string
}

export interface IFormData {
  [x: string]: any;
}

export interface ITheme {
  id: number,
  name: string,
  bg: string,
  main: string,
  sub: string,
  info: string,
  text: string,
  error: string
}

export interface IThemeState {
  theme: ITheme | null,
  pending: boolean
}

export interface IAlert {
  message: string
}

export interface IAlerts {
  alerts: IAlert[]
}
