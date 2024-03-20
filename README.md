# Fans-CRM API

The Fans-CRM API, developed using the NestJS framework, is a comprehensive solution for user management and authentication. It features JWT-based authentication, Sequelize ORM for database interactions, and a suite of other advanced functionalities.

## Project Structure Highlights

- **Common**: Contains shared utilities, guards, decorators, filters, and exception handling mechanisms.
- **Config**: Manages environment-specific configurations.
- **Modules**: Encapsulates feature-specific modules like Users and Health for better organization and scalability.
- **Core**: Core functionalities including database connections, generic services, and repositories.

## Key Features

- **User Management**: Securely manage user data with CRUD operations.
- **Authentication**: Secure routes with JWT-based authentication.
- **Health Checks**: Monitor the health of the application and its connectivity to essential services.
- **Validation and Error Handling**: Utilizes pipes for request data validation and global filters for centralized error handling.
- **Logging**: Integrated logging for monitoring and debugging purposes.
- **ORM**: Leverages Sequelize for object-relational mapping, simplifying database transactions and queries.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ephy-bayru/Fans-CRM-API.git
   cd fans-crm-api
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Copy `.env.example` to `.env` and update the database connection details and other configurations as necessary.

4. **Launch the application:**

   ```sh
   npm start
   ```

   Visit `http://localhost:3000` to access the API.

### Swagger Documentation

Access the Swagger UI at `http://localhost:3000/api` for an interactive API documentation experience, enabling you to test endpoints directly through the browser.

## Contributing

Contributions are welcome! Please refer to the contributing guidelines for more information.
