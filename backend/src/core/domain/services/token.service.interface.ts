export interface ITokenPayload {
  sub: number;
  email: string;
}

export interface ITokenService {
  generateToken(payload: ITokenPayload): string;
  validateToken(token: string): ITokenPayload;
}
