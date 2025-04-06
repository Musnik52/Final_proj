
# 🛫Project Airlock🛬 - Travel & Flights Hub

This is my final project for the 
John-Bryce Full-Stack Develepor's 
ceritficate requirement.

## Table of contents

* [General Info](#general-info)
* [Project's Structure](#project-dna)
* [Installation](#installation)
* [Initialization](#initialization)
* [Default DB Elements](#default-db-Elements)
* [Documentation](#documentation)
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

4.  The file `db_files/config.conf` manages default parameters.
    Under "db", these are the configurations required:
    ```bash
    kv_file = Full KV file location.
    sp_file = Full SP file location.
    airlines_json & countries_json & users_json = Full default json files location.
    mongo_conn = Connection string to Mongo database.
    conn_string = Connection string to PostGres SQL database.
    ```
    It is highly recomanded to adjust all configurations to the user's preference.

5.  The file `node3/config/default.json`, under the section "mongo", 
    it's required to enter a connection string to the mongo database.

6.  The file  `db_files/users_json.json` contains the defaule users
    that'll be inserted to the systems DB upon initialization.

## Initialization
To populate (or reset) the database with multiple ficticious users, flights and tickets:
    
1. Run `db_generator_producer.py` file - This'll initiate a generator where you specify
    how many airline companies, customers, flights & tickets per customer you'd like to create.
    After specifying the number in each option, press the big blue botton at the bottom.
* Note that the bottom toggle is set to "Add to DB" if you want to insert additional elements.
    If the bottom toggle is set to "Reset DB", it'll revert the DB to a setting with only
    the default elements, as explained in #6 under the "Installation" section above.

2. Run `db_generator_consumer.py` file - This'll begin the scraping for the random info
    needed to create the requested elements.
* Note that it's possible, due to the randomness of the scraping process, that the system
    could be trying to assign a parameter that's considered unique & already inserted to
    a different element. In this case, it's recommended to reset the database and try again. 

## Documentation

### General Operation
Upon performing any CRUD function with Airlock's DB, it's important to run the "consumer" files 
(`consumer_administrator.py`, `consumer_airline.py` & `consumer_customer.py`),
in order for the actions to get proccessed from the queue.

### Landing page:
Main page seen on arrival.
The airlock logo at the top left of the nav-bar is a botton leading to this page.

### Nav-bar:
Navigation throughout the app.
Click to reach desired action.

#### Nav-bar - Flights:
All available flights are shown here.
Filteration by departure/landing time is possible.

#### Nav-bar - Login/Sign-Up:
For clients: Initial registration can be don by clicking the "Sign up" button.
For airlines: Please send registration info to our email so we'll register you as our business clients.
If you have a valid user, enter the username and password and log in to perform actions.

#### Nav-bar - Misc:
This section contains some static info and elements about Airlock.

### Profile & Logout:
Profile and logout buttons are created upon a successful login of users.
The profile button leads back to the user's personal panel, while the logout butten logs the user out.

#### Client Profile:
Clients can perform the following actions:

    1. View personal tickets booked, and remove them, if the client so wishes.
    2. Book a new flight via searching an available flight from and to selected countries.
    3. edit or delete user info.
#### Airline Profile:
Airlines (business clients) can:

    1. View/edit/remove flights they operate.
    2. Create a new flight.
    3. edit or delete user info.
#### Admin Profile:
Admins control most of the system and have the power to:

    1. View/add/remove/update airlines.
    2. View/update/remove existing flights.
    3. View/remove existing clients.
    4. View relevant system statistics.
    5. Edit/Remove/add admin user

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
