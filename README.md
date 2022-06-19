# node_crud_api

NODEJS2022Q2

## After you clone repo PLEASE run **npm install** !

### For starting application in DEV mode please use the folowing commands (NOTE: follow two commands should be starting in separate console each!!!):

- **npm run start:dev_ts** => start TSC compiller in watch mode
- **npm run start:dev_node** => start nodemon on the PORT 5000 (sotred in .env file)

### For starting application in PROD mode please use the folowing command:
- **npm run start:prod** => this command will updated build in dist folder and start application on the PORT 3001 (remove `cross-env PORT=3001` from this script to run application on PORT 5000 (sotred in .env file))

### For starting application in MULTI mode please use the folowing command:
- **npm run start:multi** => start numbers of server instances equal CPUs number on PORT 5000 (sotred in .env file).

### To run tests use **npm run test**

### Application functionality tested in POSTMAN using:
- localhost:3001/api/users => GET requests
- localhost:3001/api/users/userId => GET, POST, POST, DELETE requests

After starting application firstly sent POST request to add new user to database. For filling request body please use body=>raw=>JSON in postman:

![Postman manual](https://user-images.githubusercontent.com/33061150/174450377-ef4b57e6-b701-4b86-a8f4-54a91fef665c.png "Postman manual")

Example of data: 
`{
    "username": "Frank",
    "age": 15,
    "hobbies": ["running"]
}`

After creating new Person in database you able to get full data (with userId) using GET request. And in response you can find **userId** witch is neccesary for GET (by id), PUT and DELETE requests

![Postman manual](https://user-images.githubusercontent.com/33061150/174450628-071dc5e3-f58a-41c1-9579-b8c1cb257437.png "Postman manual")
