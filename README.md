
# payTM_Application

The **payTM_Application** is a payment application that allows users to manage their accounts, perform money transfers, and authenticate securely using JSON Web Tokens (JWT). This application leverages modern web technologies to provide a seamless user experience for financial transactions.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Features
- User signup and signin with JWT authentication.
- Password validation and user input validation using Zod.
- User account management with MongoDB.
- Money transfer functionality between user accounts.

## Technologies Used
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Validation**: Zod
- **Authentication**: JWT
- **Environment Variables**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Khandayharoon/payTM_Application
   cd payTM_Application
   ```

2. Install the necessary packages:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:
   ```plaintext
   MONGO_DB_URL=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Connect to your MongoDB database and run the application:
   ```bash
   node index.js
   ```

## Usage
- To start the application, ensure MongoDB is running and use the command:
  ```bash
  npm start
  ```

- The application will be accessible at `http://localhost:3000/api/v1` (or your configured port).

## API Endpoints

### Authentication
- **POST /signup**: Create a new user account.
  - Request body: `{ firstName, lastName, username, password }`
  
- **POST /signin**: Log in a user.
  - Request body: `{ username, password }`
  
### User Account Management
- **GET /balance**: Retrieve the balance of the logged-in user.
  
- **PUT /**: Update user information (password, first name, last name).

### Money Transfer
- **POST /transfer**: Transfer money between user accounts.
  - Request body: `{ to, amount }`

## Database Schema

### User Schema
- `username`: String, required, unique
- `password`: String, required
- `firstName`: String, required
- `lastName`: String, required

### Account Schema
- `userId`: Reference to User model, required
- `balance`: Number, required

## Contributing
Contributions are welcome! If you have suggestions or improvements, please create a pull request or open an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
