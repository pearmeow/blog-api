Blog API
--------

An API meant to handle requests from the frontend made with NodeJS, Express, PostgreSQL, and Prisma.  
Most routes require a JWT given from one of the token routes. Some of the routes are unused in the frontend.  
Visit the githubs for the frontend [here](https://github.com/pearmeow/blog-frontend) and admin page [here](https://github.com/pearmeow/blog-admin).  

Features
--------

- [x] RESTful routes
- [x] Articles that are editable, have comments, and are made by authors
- [x] Ability to publish/unpublish articles
- [x] Comments that are editable and can be made by users
- [x] Users that can be made by registering and can upgrade their status with passcodes
- [x] Different permissions for users, authors, and admins
- [x] Authentication with JWTs

How to use this project
-----------------------

Hit the api [here](https://pearmeow-blog-api-421819033024.herokuapp.com/).

Routes
------

CRUD for posts  
- GET /posts
- GET /posts/:postId
- POST /posts/
- PUT /posts/:postId
- DELETE /posts/:postId

CRUD for comments  
- GET /posts/:postId/comments
- GET /posts/:postId/comments/:commentId
- POST /posts/:postId/comments
- PUT /posts/:postId/comments/:commentId
- DELETE /posts/:postId/comments/:commentId

CRUD for users  
- GET /users
- GET /users/:userId
- POST /users
- PUT /users/:userId
- DELETE /users/:userId

CRUD for authors  
- GET /authors
- GET /authors/:userId
- POST /authors
- PUT /authors/:userId
- DELETE /authors/:userId

Returns JWT for authors or users  
- POST /tokens/users
- POST /tokens/authors

Known Limitations
-----------------
It's probably got some security flaws. This project was made for the sake of learning  

Credits
-------

Me.
