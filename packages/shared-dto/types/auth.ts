export interface RequestLogin {
  email: string;
  password: string;
}

export interface ResponseLogin {
  accessToken: string;
  refreshToken: string;
}
