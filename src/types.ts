export interface IUserInfo {
  username: string,
  email: string,
  verified: boolean,
  avatar: string
}

export interface IUser {
  userInfo: IUserInfo | null,
  getCurrentUser: {
    pending: boolean,
    finished: boolean
  }
}

export interface IState {
  user: IUser
}

export interface IFormError {
  loc: string[],
  msg: string
}
