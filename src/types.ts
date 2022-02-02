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
  alerts: IAlerts,
  notes: INotes,
  sections: ISections
}

export interface IFormError {
  type?: string,
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

export interface ICruStatus {
  pending: boolean,
  success: boolean,
  errors: IFormError[]
}

export interface IGetStatus {
  pending: boolean,
  finished: boolean
}

export interface INotes {
  notes: INote[],
  fetchNotes: IGetStatus,
  createNote: ICruStatus,
  removeNote: ICruStatus,
  updateNote: ICruStatus
}

export interface INote {
  id: number,
  title: string,
  body: string | null,
  parent_id: number | null,
  favorite: boolean
  timestamp: number,
  modified: number
}

export interface ISections {
  sections: ISection[],
  fetchSections: IGetStatus
}

export interface ISection {
  id: number,
  name: string,
  parent_id: number | null,
  favorite: boolean,
  timestamp: number,
  modified: number,
  notes: INote[],
  sub_sections: ISection[]
}
