# Job Hub

This project is an Inventory Management System built with Angular 18 for the frontend and Node.js with Express and MySQL for the backend. The system allows for the management of users, inventory items, and transactions between vendors and customers.

## Features

- User Management: Add, edit, and delete users.
- Inventory Management: Add, edit, and delete inventory items.
- Transaction Management: Record transactions between vendors and customers, including item details and quantities.

## Technologies Used

- **Frontend**: Angular 18
- **Backend**: Node.js, Express
- **Database**: MySQL

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- Angular CLI
- MySQL

### Installation

1. **Clone the repository**

    ```sh
    git clone https://github.com/g33krock/jobhub.git
    cd jobhub
    ```

2. **Backend Setup**

    a. Navigate to the `server` directory

    ```sh
    cd server
    ```

    b. Install backend dependencies

    ```sh
    npm install
    ```

    c. Create a `.env` file with the following content:

    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=EWork
    PORT=3000
    ```

    d. Run the migration script to set up the database

    ```sh
    node migrate.js
    ```

    e. Start the backend server

    ```sh
    node server.js
    ```

3. **Frontend Setup**

    a. Navigate to the `client` directory

    ```sh
    cd ../client
    ```

    b. Install frontend dependencies

    ```sh
    npm install
    ```

    c. Start the Angular development server

    ```sh
    ng serve
    ```

4. **Access the Application**

    Open your browser and navigate to `http://localhost:4200`

## Project Structure

```plaintext
jobhub/
├── client/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/                  # Home component
│   │   │   ├── inventory/             # Inventory components
│   │   │   ├── transaction/           # Transaction components
│   │   │   ├── user-form/             # User form component
│   │   │   ├── user-list/             # User list component
│   │   │   ├── app.component.html     # Main app component template
│   │   │   ├── app.component.ts       # Main app component logic
│   │   │   ├── app.routes.ts          # Application routes
│   │   └── main.ts                    # Angular main entry point
├── server/              # Express backend
│   ├── server.js        # Main server file
│   ├── migrate.js       # Database migration script
│   ├── package.json     # Backend dependencies
├── .env                 # Environment variables
├── README.md            # Project README file
└── package.json         # Root dependencies
```

## API Endpoints

### Users

- **GET /users - Get all users**
- **POST /users - Create a new user**
- **PUT /users/:id - Update an existing user**
- **DELETE /users/:id - Delete a user**

### Inventory

- **GET /inventory - Get all inventory items**
- **POST /inventory - Create a new inventory item**
- **PUT /inventory/:id - Update an existing inventory item**
- **DELETE /inventory/:id - Delete an inventory item**

### Transactions

- **GET /transactions - Get all transactions**
- **POST /transactions - Create a new transaction**

### Contributing
1. **Fork the repository.**
2. **Create a new branch: git checkout -b master.**
3. **Make your changes and commit them: git commit -m 'Add some feature'.**
4. **Push to the branch: git push origin master.**
5. **Submit a pull request.**