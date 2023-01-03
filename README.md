#Streaming platform

This project is a fullstack developer project simulating  a Streaming Platform.

The frontend is developed in React, using Redux to manage the global state and own libraries to connect with the backend.

The backend is developed in Spring Boot 2.7.5, using Spring MVC, Spring Security, Spring JPA with Java 11 and using a H2 database.

You are free to download the project, running the front end with the classic npm start, and the backend running the DemoApplication.java

In the file data.sql that is in the backend/src/main/resources you can find two users:

('admin@hotmail.com', 'nombreadmin', 'admin', 'ADMIN'),

('user@hotmail.com', 'nombreUser', 'user', 'USER');

With them you can make some proof of concepts.

Besides, all the project use and API called The Movie Database as a source of the movie's data.
