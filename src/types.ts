export interface IMeInfo {
  username: string,
  is_verified: boolean,
  avatar_id: string
}

export interface IMe {
  meInfo: IMeInfo | null,
  pending: boolean,
  finished: boolean
}

export interface IState {
  me: IMe,
  theme: ITheme,
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
  theme: {
    id: number,
    name: string,
    bg: string,
    main: string,
    sub: string,
    info: string,
    text: string,
    error: string
  } | null,
  pending: boolean
}

export interface IAlert {
  message: string
}

export interface IAlerts {
  alerts: IAlert[]
}
