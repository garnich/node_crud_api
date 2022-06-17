import { createServer } from 'http';
import { env } from 'process';
import { config } from 'dotenv';
import Storage from './src/storage/storage';
import { IUser, INewUser } from './src/types/types';
import { validate as isValidUUID } from 'uuid';
import { dataChecker } from './src/helpers/helpers';

config();

const PORT = env.PORT || 3000;

export const server = createServer(async (request, response) => {
  try{
    const urlArr = request.url?.split('/');

    if(urlArr && urlArr.length > 3) {
      const id = urlArr.pop();
      if(id && !isValidUUID(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify('Request contain INVALID id'));
        response.end();
      } else if (id && request.method === 'GET') {
        const user = await Storage.apiGetUserById(id).then((user: IUser | undefined) => user);

        if(user) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(user));
          response.end();
        } else {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(`Can't find user with id: ${id}`));
          response.end();
        }
      } else if(id && request.method === 'PUT') {
          let data = '';
        
          request.on('data', chunk => {
            data += chunk;
          });
          request.on('end', async () => {
            const params = JSON.parse(data);

            const updatedUserData: INewUser = {
              username: params.username,
              age: params.age,
              hobbies: params.hobbies
            };

            const updatedUser = await Storage.apiUpdateUser(id, updatedUserData).then((user: IUser | undefined) => user)
            
            if (updatedUser) {
              response.writeHead(200, { 'Content-Type': 'application/json' });
              response.write(JSON.stringify(updatedUser));
              response.end();
            } else {
              response.writeHead(404, { 'Content-Type': 'application/json' });
              response.write(JSON.stringify(`Can't find user with id: ${id}`));
              response.end();
            }
        });
      } else if(id && request.method === 'DELETE') {
        const users = await Storage.apiDeleteUser(id).then((users: IUser[] | undefined) => users);

        if(users) {
          response.writeHead(200, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(`Successfully finded and deleted user with id: ${id}`));
          response.end();
        } else {
          response.writeHead(404, { 'Content-Type': 'application/json' });
          response.write(JSON.stringify(`Can't find and delete user with id: ${id}`));
          response.end();
        }
      }
    } else  if (request.url === '/api/users' && request.method === 'GET') {
      const users = await Storage.apiGetUsers().then((users: IUser[]) => users);

      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify(users));
      response.end();
    } else  if (request.url === '/api/users' && request.method === 'POST') {

        let data = '';
        
        request.on('data', chunk => {
          data += chunk.toString();
        });
        
        request.on('end', async () => {
          const params = JSON.parse(data);
          const isValidData = dataChecker(params);

          if(isValidData){

            const userData: INewUser = {
              username: params.username,
              age: params.age,
              hobbies: params.hobbies
            };
            
            const newUser = await Storage.apiCreateUser(userData).then((user: IUser) => user);
            
            response.writeHead(201, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify(newUser));
            response.end();
          } else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.write(JSON.stringify('Sorry! Data is invalid. Note: username(sting), age(number), hobbies([] or [] of strings) are REQUIRED!)'));
            response.end();
          }
      });
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify('Sorry! Looks like I can\'t resolve this route.'));
      response.end();
    }
  } 
  catch (error) {
    if(error) {
      response.writeHead(500, { 'Content-Type': 'application/json' });
      response.write(JSON.stringify('Sorry! Something went wrong on our side.'));
      response.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
