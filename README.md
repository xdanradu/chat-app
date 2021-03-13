# chat-app

Uses docker images for proof of concept prototypes:

    - auth-microservice: http REST, Postman, express, sequelize
    - messages-microservice: websockets
    - profile
    - database: MySQL
    - PHPMyAdmin: for DB management
    - frontend: any (React, Angular, Svelte, Vue?)
    
How to configure and run:

1. MySQL 
    Source: https://medium.com/@migueldoctor/run-mysql-phpmyadmin-locally-in-3-steps-using-docker-74eb735fa1fc
    
    Commands: 
    
    ```bash
    docker pull mysql:latest
    docker run --name dev-db -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:latest
    ```
   
   If the container has already been created you can start it from docker containers or from command line:
   
   ```bash
   docker container ls
   docker container start 109751a07de1
   ```
   
   MySQL server will be accessible from any docker image that runs on localhost: 
   DB_HOST=db
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=app-db
   
   You have to manually create a new database with PHPMyAdmin called 'auth' with a 'users' table 
   (see auth microservice database controller and .env file).
   
2. PHPMyAdmin

    ```bash
    docker pull phpmyadmin/phpmyadmin:latest
    docker run --name dev-phpmyadmin -d --link dev-db:db -p 8081:80 phpmyadmin/phpmyadmin
    ```
   
PHPMyAdmin access: http://localhost:8081


3. auth-microservice
   
Development:

    ```bash
    npm install
    npm run dev
    ```
    
Deploy on Docker:

```bash
     docker build -t dradu/auth_microservice .
     docker run -p 49160:8080 -d dradu/auth_microservice
```

REST API access: http://localhost:8080 

## TODO
    
   - react-microservice
   - messages-microservice
    
   ### compose file to start Docker images:
   
   - mysql
   - phpmyadmin
   - auth-microservice
   - react-microservice
   - messages-microservice


How to start everything in one network:        
```bash
    docker-compose up -d
    docker-compose down --volumes
```    
        
        host: db
        user: root
        pass: root


# Running the system

Development mode

- run the mysql and phpmyadmin containers from docker
- run auth-microservice in dev mode from package json

Deployment mode
Deploy everything with docker compose from root directory:

```bash 
docker-compose up -d
``` 
