# E-COMMERCE-BACK-END

The E-COMMERCE-BACK-END project leverages Express.js and Sequelize to provide a robust API for e-commerce platforms, facilitating efficient management of categories, products, and tags through a MySQL database. This solution is designed for developers looking to streamline backend processes in e-commerce applications.

## Description

This project simplifies the interaction between an Express.js application and a MySQL database, using Sequelize for ORM. It supports full CRUD operations for managing categories, products, and tags, making it an ideal backend for e-commerce platforms. The API returns data in a structured JSON format, allowing for seamless integration with frontend technologies.

## Features

- MySQL database integration using Sequelize ORM.
- Environment-based configuration for database connections.
- Automated schema creation and database seeding.
- Server initialization with Sequelize model synchronization.
- RESTful API routes for CRUD operations on categories, products, and tags.
- Formatted JSON responses for easy frontend consumption.

## Getting Started

### Prerequisites

- Node.js
- MySQL
- Insomnia Core or another API testing tool

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/JLJ98/E-commerce-Back-End

2. Install Dependencies
Run npm install in your terminal

# Environment Configuration
Create an .env file at the root of the project with the following configuration:
DB_NAME='ecommerce_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'

# Database Setup
Create and Seed the Database:
Run npm run schema and npm run seed in your terminal

# Start the Server
Invoke the Application
Run npm start in your teminal

# Usage
. API Endpoints
. Categories
. GET /api/categories: Retrieve all categories.
. GET /api/categories/:id: Retrieve a single category by ID.
. POST /api/categories: Add a new category.
. PUT /api/categories/:id: Update an existing category.
. DELETE /api/categories/:id: Remove a category.

 # Products & Tags
. Use similar endpoints as above for managing products and tags.

# Testing API Endpoints
. Utilize Insomnia Core to test the functionality of the API endpoints, ensuring the ability to fetch, create, update, and delete resources in the database.

# Contributing
. Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

# License
. This project is licensed under the MIT License - see the LICENSE file for details.

# Links
https://drive.google.com/file/d/1MP3PsEQr9Bx36ICdDJN2oROI-am_mF6n/view

# Contact
Jon-Luke Jenkins - jonlukejenkins2@gmail.com
Project Link - https://github.com/JLJ98/E-commerce-Back-End

# Acknowledgements
Special thanks to the tutors, ChatGPT, Ask BCS, Xpert Learning Assistant, and various YouTube tutorials for providing valuable guidance and resources throughout the development process.