import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fans-CRM API')
  .setDescription(
    `The Fans-CRM API provides a comprehensive suite for managing user data and facilitating secure access through authentication. It supports a range of operations essential for a robust user management system, including adding new users and retrieving user information, alongside ensuring secure access via JWT-based authentication.

    **Core Features**:
    - **User Management**: Create and retrieve user data securely.
    - **Auth**: Secure access to API endpoints with JWT tokens.

    **Endpoints Overview**:
    - \`POST /api/v1/add-user\`: Register a new user with detailed user information.
    - \`GET /api/v1/get-user/:id\`: Fetch user details by their unique identifier.
    - \`POST /api/v1/auth/login\`: Authenticate a user and return JWT tokens.
    - \`GET /health\`: Provides the health status of the API service.`,
  )
  .setVersion('1.0')
  .addTag('Users', 'Operations related to user management')
  .addTag('Auth', 'Authentication and authorization processes')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
  .setContact(
    'Fans-CRM Support',
    'https://fans-crm.com/support',
    'support@fans-crm.com',
  )
  .setLicense('', '')
  .addServer(
    process.env.DEV_URL || 'http://localhost:3000',
    'Local Development Server',
  )
  .addServer(
    process.env.PROD_URL || 'https://api.fans-crm.com',
    'Production Server',
  )
  .addServer(
    process.env.STAGING_URL || 'https://api-staging.fans-crm.com',
    'Staging Server',
  )
  .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'none',
    filter: true,
    showRequestDuration: true,
  },
  customSiteTitle: 'Fans-CRM API Documentation',
};
