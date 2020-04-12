# Express, Typescript, Mongo, Docker starter

This project is built to make building and running a Nodejs API easily as a container service.

Production [Dockerfile](Dockerfile) is using multistage builds to make the final image half the size of the original.

## Installation

Docker and Docker compose needs to be installed on the host environment.  

Express/Nodejs application documentation is [in app directory](app/README.md).  

We recommend changing container_name and hostname in docker-compose.yml file.

## Usage

Basic usage ```npm start``` or ```npm run start:dev```.
 
When you switch between production or dev docker builds please rebuild using ```npm run build``` or ```npm run build:dev```

Sometimes you see console output with errors that app couldn't connect to MongoDB. The app will retry until it can. 

## Commands

| Npm Script | Description |
| -------------------------| ---------------------------------------------------------------------------|
| npm start                | Starts docker container with production build |
| npm run build            | Runs docker container with new production build |
| npm run start:out        | Runs docker container with production build and outputs console output |
| npm run start:dev        | Runs docker container with development environment |
| npm run build:dev        | Rebuilds development docker container  |
| npm run stop             | Stops all the containers |

## License

Licensed under the [MIT](LICENSE) License.