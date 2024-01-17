# Intro

The repository for the picture posting application for the Front-end developer course, including the front-end on React and the backend on Node.js parts with the following features:

- user authorization and registration
- user info changing
- adding new pictures with description
- like cards

___
# How to start

_FYI - as server started localy, there won't be any pictures in the app. To se the functionality Add your pictures with URL & name_

### To run the application locally, you need to download repository:
- https://github.com/Suestado/react-mesto-api-full-gha
<br>Repository has two folders for _Frontend_ & _Backend_



### Start Backend server locally.
Open Backend folder & run server.
<br>Server should start on port 4000 automatically.
<br>You should have Mongo.db installed on your PC.
```angular2html
npm start
```
Positive result:
```angular2html
Сервер запущен на порту 4000
Подключение к базе данных установлено
```

### Start Frontend locally.
To avoid CORS errors an App have to be opened on PORT 3000 (http://localhost:300/)
```angular2html
npm start
```
Positive result:
```angular2html
You can now view movies-explorer-frontend in the browser.

Local:            http://localhost:3000
On Your Network:  http://######

```
___
# Used technologies:
* Frontend
    * React
        * React
        * React-router
        * React-hook-form
    * HTML5
    * CSS
    * Grid/flex layout
    * Semantic

* Backend
    * Node.js
    * Express.js
    * Mongoose
    * nginx
