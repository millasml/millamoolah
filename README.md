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


## API design - Express
