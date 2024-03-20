export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'FansCRMSecretKey123!',
  accessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '60m',
  refreshSecret:
    process.env.JWT_REFRESH_SECRET || 'FansCRMRefreshSecretKey456!',
  refreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
};
