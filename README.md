# Members Only

## Overview

-   Part of The Odin Project's Node Section
-   This project is a members-only message board where users can post and view messages.
-   If the user is authenticated (a member), they can view the author and date of each message.
-   Otherwise, authenticated users(non-member) can still view the message content but cannot see the author & date details.
-   Data is stored in a PostgreSQL database and can be accessed or modified through the application.

## Tech Stack

-   Node.js
-   Express.js
-   EJS
-   PostgreSQL
-   Tailwind
-   Flowbite

## Packages

-   Express validator
-   Express Session
-   Passport
-   Bcryptjs

## Routes

-   `GET /`: Shows the messages page if authenticated, otherwise shows the public homepage
-   `POST /sign-up`: Authenticates the user and redirects to the messages page if successful
-   `POST /login`: Registers a new user and redirects to the messages page upon success
-   `GET /log-out`: Logs out the user and redirects to the public homepage
-   `POST /newMessage`: Submit a new message for auth user
-   `POST /activatemembership`: Update membership status for auth user

## File structure

-   `controllers/`: Handles different parts of the members only app.
-   `config/`: Configuration for express pg session & passport.
-   `db/`: Database connection configuration and query logic.
-   `routes/`: Manages all routes.
-   `views/`: EJS templates for rendering pages.
-   `app.js`: Main server file.

## Deployment

-   Hosted on Railway (db) & Render (server)

## Contact

Created by [@nabelk](https://www.linkedin.com/in/nabil-khalid-36791a241/) - feel free to contact me!
