export interface JwtPayload {
  sub: number;
  username: string;
  email?: string;
  iat?: number;
  exp?: number;
}
