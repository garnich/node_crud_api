const request = require('supertest');
import { server } from '../index';
import { validate as isValidUUID } from 'uuid';

describe('Scenario #1 endpoints work properly', () => {
    afterEach(async () => {
        await server.close()
      })

    it('tests GET method /api/users endpoint', async() => {
        const response = await request(server).get("/api/users");
        expect(response.body).toEqual([]);
    });

    it('tests POST method /api/users endpoint', async() => {
        const response = await request(server).post("/api/users").send({username: 'Tom', age: 12, hobbies: []});
        expect(response.body.age).toEqual(12);
        expect(response.body.hobbies).toEqual([]);
        expect(response.body.username).toEqual('Tom');
        expect(isValidUUID(response.body.id)).toBeTruthy();
    });

    it('tests GET method api/users/{userId} endpoint', async() => {
        const postResponse = await request(server).post("/api/users").send({username: 'Jhon', age: 21, hobbies: ['running']});

        const id = postResponse.body.id;
        const result = { id, username: 'Jhon', age: 21, hobbies: ['running']};

        const getResponse = await request(server).get(`/api/users/${id}`);

        expect(getResponse.body).toEqual(result);
    });

    it('tests PUT method api/users/{userId} endpoint', async() => {
        const postResponse = await request(server).post("/api/users").send({username: 'Jack', age: 37, hobbies: ['swimming']});

        const id = postResponse.body.id;
        const result = { id, username: 'Jack', age: 37, hobbies: ['swimming']};

        const updateResponse = await request(server).put(`/api/users/${id}`).send({age: 41});

        expect(updateResponse.body).toEqual({...result, age: 41});
    });

    it('tests DELETE method api/users/{userId} endpoint', async() => {
        const postResponse = await request(server).post("/api/users").send({username: 'Sara', age: 19, hobbies: ['dancing']});

        const id = postResponse.body.id;
        const deleteResult = `Successfully finded and deleted user with id: ${id}`;
        const getResult = `Can't find user with id: ${id}`
        const updateResponse = await request(server).delete(`/api/users/${id}`);

        expect(updateResponse.body).toEqual(deleteResult);

        const getResponse = await request(server).get(`/api/users/${id}`);

        expect(getResponse.body).toEqual(getResult);
    });
});
