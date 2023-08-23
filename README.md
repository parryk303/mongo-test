## Dev Dependencies
* NodeJS v16.14.x
* PostgreSQL v13.7 or above


## Initialization
1. Clone project repository using:
```git clone ${repo.git}```
2. Install npm packages using
```npm install```
or
```yarn```
3. Create environment file based on the sample file.
```cp sample.env .env```
4. Fill out necessary environment variables in the newly created `.env` file using editor of your choice.

### Start dev environment

Follow below steps to get the application started in development environment.

#### Backend and Frontend application separately

1. Start backend application after following all steps of "Initialization" section above using:
```
npm run server
```
 or
 ```
 yarn server
 ```

 2. Start frontend application using:
 ```
 source .env
 npm run start:fe
 ```
 or
```
source .env
yarn start:fe
```

### Prepare production build

Considering current working directory is the root folder in repository.

1. If current operating system is Linux based then ensure that docker service is running so that docker commands can be executed.
``` systemctl status docker```
or
``` systemctl status dockerd```
`docker`/`dockerd` depends on the OS. Usually `docker` works just fine.

2. Build docker image using
```
docker build --build-arg PORT <PORT_TO_BE_EXPOSED_BY_CONTAINER> -t <IMAGE_NAME> .
```
4. The image is ready for us to start a container. 

```
docker run --name <CONTAINER_NAME> -p <PORT_MAPPING> <IMAGE_NAME>
```

The port mapping includes local port at which the application will be accessed in browser and the port that was sent as build argument `PORT` while building the image, separated by a `:`.
In case the build argument `PORT` was not passed then the port `3000` or the one set in `.env` should be used.
