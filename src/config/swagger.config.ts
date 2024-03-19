import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Fans-CRM API')
  .setDescription(
    `
    The Fans-CRM API facilitates simple user management operations. It's designed as a RESTful service supporting basic CRUD operations with a focus on adding and retrieving user information. 

    **Endpoints**:
    - POST /api/v1/add-user: Add a new user to the CRM system. Requires user details in the request body.
    - GET /api/v1/get-user/:id: Retrieve information about a user by their unique identifier.
    - GET /health: Check the health status of the application.
   `,
  )
  .setVersion('1.0')
  .addTag('Users', 'Endpoints related to user management')
  .addTag('Auth', 'Endpoints related to authentication')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .setContact(
    'Fans-CRM Support',
    'https://fans-crm.com/support',
    'support@fans-crm.com',
  )
  .setLicense('', 'licenses url')
  .addServer(
    process.env.PROD_URL || 'https://default-prod-url.com',
    'Production Server',
  )
  .addServer(
    process.env.STAGING_URL || 'https://default-staging-url.com',
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
