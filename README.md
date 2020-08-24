# millamoolah

## What is This?

This is a MERN application, 

## Cloning the repository
We are using submodules to store the client and server in separate repositories. Hence, to clone the entire project, run the following command
```
git clone --recursive https://github.com/millasml/millamoolah.git
```

## Starting it Up
We are using docker to make it easier to run the application in development. We have 3 containers for the database, client and server respectively. All these containers run in an application that is outlined in the docker-compose.yml file.

We use yarn throughout in this project.

To start the project up, be in the root directory `/millamoolah` and run the following commands

```
docker-compose build
docker-compose up
```

### The Docker Setup - Development
the docker containers are for the server, client and database respectively. We then expose the relavent ports.

We are using the [bridge network driver](https://docs.docker.com/network/bridge/) as each part of our stack (MongoDB, Express and React) work in standalone containers. Having the bridge networks allow them to communicate with each other. 

Note that we do not have any docker volumes to persist our database data. This is because I am developing on Windows 10, and according to the documentation of the mongo image on dockerhub,

> The default Docker setup on Windows and OS X uses a VirtualBox VM to host the Docker daemon. Unfortunately, the mechanism VirtualBox uses to share folders between the host system and the Docker container is not compatible with the memory mapped files used by MongoDB (see vbox bug, docs.mongodb.org and related jira.mongodb.org bug). This means that it is not possible to run a MongoDB container with the data directory mapped to the host.

Hence, we will reinstantiate the database constantly, and run a script on start of development that populates it with fake data. 

## Database Design - Using MongoDB
as there are no joins in NoSQL databases, there will be some copying of data. 


## Seeding The Database
Created some seed data, and we initialize a database with that seed data everytime on start up


## JWT Authentication
Using google firebase authentication
https://firebase.google.com/docs?authuser=0


https://jwt.io/introduction/
https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0#:~:text=Storing%20JWT%20Token&text=We%20can%20store%20it%20as,ll%20store%20it%20in%20sessionStorage.&text=%2F%2Fpersisted%20across%20tabs%20and%20new%20windows.

store jwt token in session storage

use firebase admin sdk to check token in the express API

pros - do not store passwords in the database, firebase does all the salt and hash

## API design - Express
https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps

### The Middleware
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction#Using_middleware
The only difference between a middleware function and a route handler callback is that middleware functions have a third argument next, which middleware functions are expected to call if they are not that which completes the request cycle

The middleware can perform any operation, execute any code, make changes to the request and response object, and it can also end the request-response cycle. If it does not end the cycle then it must call `next()` to pass control to the next middleware function (or the request will be left hanging)

You can add a middleware function to the processing chain with either app.use() or app.add(), depending on whether you want to apply the middleware to all responses or to responses with a particular HTTP verb (GET, POST, etc). You specify routes the same in both cases, though the route is optional when calling app.use().

https://expressjs.com/en/guide/using-middleware.html
middleware function with no mount path - The function is executed every time the app receives a request



## React Redux
slices


## Possible tech to incorporate
* socket.io
* microservice architectures
* server side caching