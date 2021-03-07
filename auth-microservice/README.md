https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

### Build the Docker image
docker build -t dradu/auth_microservice .

### List Docker images
docker images

### Run the image on port 49160
docker run -p 49160:8080 -d dradu/auth_microservice

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080
If you need to go inside the container you can use the exec command:
# Enter the container
$ docker exec -it <container id> /bin/bash

Test
To test your app, get the port of your app that Docker mapped:

$ docker ps

# Example
ID            IMAGE                                COMMAND    ...   PORTS
ecce33b30ebf  <your username>/node-web-app:latest  npm start  ...   49160->8080

Dev env:
https://auth0.com/blog/use-docker-to-create-a-node-development-environment/

https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

## Start the app 
npm run dev

## Routes to test 
GET localhost:8080

Get the token using any username and password {"username": "root", "password": "123"} as request body (json) from:

POST localhost:8080/auth/login

Check the token (using Postman) by manually setting the token on the Authorization header as "Bearer wqewqhewqe-token-wewqe":

GET localhost:8080/auth/login

GET localhost:8080/secured








