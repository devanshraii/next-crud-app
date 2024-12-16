# Next.js CRUD App

A simple CRUD application built with **Next.js** and **MongoDB**. This app allows users to register, log in, update their details, and delete their accounts. It demonstrates the use of JWT authentication, MongoDB for storing user data, and RESTful API endpoints for user management.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **CRUD Operations**: Create, Read, Update, and Delete users.
- **Secure API Endpoints**: API endpoints are protected using JWT authentication.

## Technologies Used

- **Frontend**: React, Next.js (v15.1.0)
- **Backend**: Next.js API routes
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v14 or later)
- MongoDB (local or MongoDB Atlas account)
- npm (Node Package Manager)

## Setup and Installation

### 1. Clone the Repository

git clone https://github.com/your-username/next-crud-app.git
cd next-crud-app

### 2. Install Dependencies
Run the following command to install all necessary dependencies:
npm install

### 3. Environment Variables
Create a .env.local file in the root of the project and set the following environment variables:

MONGO_URI=mongodb://localhost:27017/your-database-name

JWT_SECRET=your-secret-key

Replace your-database-name with the name of your MongoDB database.

Replace your-secret-key with a strong secret key for JWT authentication.

### 4. Run the Development Server
Start the development server by running:
npm run dev
This will start the app on http://localhost:3000.

API Endpoints

GET /api/users: Fetch all users (Requires JWT authentication)

POST /api/users: Create a new user (Sign up)

PUT /api/users/[id]: Update an existing user’s details (Requires JWT authentication)

DELETE /api/users/[id]: Delete a user (Requires JWT authentication)

Frontend Pages

Dashboard

The Dashboard page allows logged-in users to:

View a list of users.

Edit user details.

Delete a user.

Sign Up

The Sign Up page allows new users to create an account by providing their name, email, and password.

Login

The Login page allows users to sign in using their email and password.
