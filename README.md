MyFlix Movie API

Welcome to the MyFlix Movie API! This API serves as the backend for a movie application where users can access information about movies, manage their user profiles, and create lists of favorite movies.

Features

User Authentication: Users can register, login, and update their profiles securely using JWT token authentication.
Movie Data: Access information about movies including title, genre, director, and more from the MongoDB database.
User Profiles: Users can create, read, update, and delete their profiles, including changing their username, password, and email.
Favorite Movies: Users can create a list of favorite movies by adding movies from the database to their list.

Getting Started

To get started with the MyFlix Movie API, follow these steps:

Install dependencies:

Set up your MongoDB database:

Create a MongoDB database named myflix.
Create two collections named movies and users.
Populate the movies collection with movie data including title, genre, director information, etc.
Set up indexes and ensure appropriate permissions for the users collection.
Configure environment variables:

Create a .env file in the root directory.

Define environment variables including PORT, DATABASE_URI, SECRET_KEY, etc.
Start the server:

Access the API endpoints using your favorite API testing tool (e.g., Postman).

API Endpoints

GET /movies: Retrieve a list of all movies.
GET /movies/:id: Retrieve a single movie by its ID.
GET /movies/genre/:genre: Retrieve movies by genre.
GET /movies/director/:directorName: Retrieve movies by director name.
POST /users: Register a new user.
POST /login: Log in an existing user.
GET /users/:username: Retrieve user profile information.
PUT /users/:username: Update user profile information.
DELETE /users/:username: Delete a user account.
POST /users/:username/movies/:movieID: Add a movie to a user's favorite list.
DELETE /users/:username/movies/:movieID: Remove a movie from a user's favorite list.

Technologies Used

MongoDB Atlas: Cloud database service used to store movie and user data.
Express.js: Web application framework used for building the API.
Node.js: JavaScript runtime environment for running server-side code.
Heroku: Cloud platform used for deploying and hosting the API.
JWT Token Authentication: Secure authentication mechanism used for user authentication.
bcrypt: Library used for password hashing.

Testing with Postman

Use Postman to test the API endpoints and database queries.
Set up environment variables in Postman to easily switch between local and production environments.
