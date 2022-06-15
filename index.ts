import { createServer } from 'http';
import { env } from 'process';
import { config } from 'dotenv';

config();

const PORT = env.PORT || 3000;

const server = createServer(async (request, response) => {
  if (request.url === '/api/users' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('all users records');
    response.end();
  }

  if (request.url === '/api/users/${userId}' && request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('user with ${userId}');
    response.end();
  }

  if (request.url === '/api/users' && request.method === 'POST') {
    response.writeHead(201, { 'Content-Type': 'application/json' });
    response.write('newly created record of user');
    response.end();
  }

  if (request.url === '/api/users/${userId}' && request.method === 'PUT') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('updated record of user');
    response.end();
  }

  if (request.url === '/api/users/${userId}' && request.method === 'DELETE') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write('record of user is found and deleted');
    response.end();
  }

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify({ message: 'Route not found' }));
  response.end();
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
