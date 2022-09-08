
# 🛫Project Airlock🛬 - Travel & Flights Hub

This is my final project for the 
John-Bryce Full-Stack Develepor's 
ceritficate requirement.

## Table of contents

* [General Info](#general-info)
* [Project's Structure](#project-dna)
* [Installation](#installation)
* [Acknowledgements](#acknowledgements)


## General info

This is a website where clients, airport companies
and administrators can log-in and perform various actions, such as purchasing a flight ticket, 
updating information, create new users, change flight info & more!

#### *IMPORTANT*:
Make sure to check and meet the 
requirements & dependencies before initiating the project.

## Project DNA

- _Back-end:_ 
    Most of the back-end is based on python
    and its libraries (see 'requirements.txt' file).
    Node.js (Express) is used to set up the server and 
    manage API requests.
    Communication is done via microservices.

- _Front-end:_
    The components are renderd using React.js,
    with the use of custom CSS & Bootstrap library.

- _Databases:_
    SQL - Postgres
    NoSQL - MongoDB

- _Additional:_
    Micro-service: RabbitMQ

## Installation

1.  Install my project's node dependencies with npm command:
```bash
  npm install
```
2.  Install Python packages, by using the following command:
```bash
  pip install -r db_files/requirements.txt
```
3.  Make sure to configure RabbitMQ microservice on your machine. 
    use the following link for assistance:
    https://www.tutlane.com/tutorial/rabbitmq/rabbitmq-installation

4.  The file ```db_files/config.conf``` manages default parameters.
    Under "db", these are the configurations required:
    ```bash
    kv_file = Full KV file location.
    sp_file = Full SP file location.
    airlines_json & countries_json & users_json = Full default json files' location.
    mongo_conn = Connection string to Mongo database.
    conn_string = Connection string to PostGres SQL database.
    ```
    It is highly recomanded to adjust all configurations to the user's preference.

5. The file ```node3\config\default.json```, under the section "mongo", 
    it's required to enter a connection string to the mongo database.

## Acknowledgements
-   
    John Bryce Academy - for providing me the 
    means and opportunity to recieve the education 
    needed to accomplish this project.
-   
    Itay Houftman & Yuval - for the direction & support
    throughout the course.
-
    My fiancé, Shachar - for believing in me and
    pushing me not to give up & keep learning new things.
    
## 🚀 About Me

I'm a full-stack developer 🧑‍💻 
My stack is:

Python 🐍, Node.js 🟢, React.js ⚛, HTML5, CSS3, JavaScript 🕸
SQL & NoSQL 🐘🍃, Microservices 🐰, Docker 🐳, REST APIs 🖥

*Beauty is in the eye of the coder.*
