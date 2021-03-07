# chat-app

## auth-microservice

## DB
MySQL with PhpMyAdmin

https://medium.com/@migueldoctor/run-mysql-phpmyadmin-locally-in-3-steps-using-docker-74eb735fa1fc

docker pull mysql:8.0.1

docker run --name my-own-mysql -e MYSQL_ROOT_PASSWORD=root -d -p 3306:3306 mysql:8.0.1

docker pull phpmyadmin/phpmyadmin:latest

docker run --name my-own-phpmyadmin -d --link my-own-mysql:db -p 8081:80 phpmyadmin/phpmyadmin

Access PHPMyAdmin: http://localhost:8081

## mysql

## phpmyadmin
