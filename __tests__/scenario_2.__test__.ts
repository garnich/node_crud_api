const request = require('supertest');
import { server } from '../index';
import { validate as isValidUUID } from 'uuid';

describe('Scenario #2 endpoints should handle userId doesn\'t exist or with invalid userId', () => {
    afterEach(async () => {
        await server.close()
      })

    it('tests GET method api/users/{userId} endpoint', async () => {
        const postResponse = await request(server).post("/api/users").send({username: 'Jhon', age: 21, hobbies: ['running']});

        const id = postResponse.body.id;

        expect(isValidUUID(id)).toBeTruthy();

        const wrongIdArr = id.split('');

        wrongIdArr[wrongIdArr.length-1] = Number(wrongIdArr[wrongIdArr.length-1]) > 5 ? '1' : '6';
        
        const wrongId = wrongIdArr.join('');
        
        const result = { id, username: 'Jhon', age: 21, hobbies: ['running']};

        const getResponse = await request(server).get(`/api/users/${id}`);

        expect(getResponse.body).toEqual(result);

        const getResponseWithWrongId = await request(server).get(`/api/users/${wrongId}`);

        expect(getResponseWithWrongId.body).toEqual(`Can't find user with id: ${wrongId}`);
    });

    it('tests PUT method api/users/{userId} endpoint', async () => {
        const postResponse = await request(server).post("/api/users").send({username: 'Jhon', age: 21, hobbies: ['running']});

        const id = postResponse.body.id;

        expect(isValidUUID(id)).toBeTruthy();

        const wrongIdArr = id.split('');

        wrongIdArr[wrongIdArr.length-1] = Number(wrongIdArr[wrongIdArr.length-1]) > 5 ? '1' : '6';
        
        const wrongId = wrongIdArr.join('');
       
        const updateResponseWithInvalidId = await request(server).put(`/api/users/${wrongId}`).send({age: 41});

        expect(updateResponseWithInvalidId.body).toEqual(`Can't find user with id: ${wrongId}`);
    });

    it('tests DELETE method api/users/{userId} endpoint notVaildId', async() => {
        const notVaildId = '123'

        expect(isValidUUID(notVaildId)).toBeFalsy();

        const deleteResultWithNotValidId = await request(server).delete(`/api/users/${notVaildId}`);

        expect(deleteResultWithNotValidId.body).toEqual("Request contain INVALID id");
    });

    it('tests DELETE method api/users/{userId} endpoint nonExistingId', async() => {
        const nonExistingId = '954063c9-396b-40a3-b65b-2d667c5d63a4';

        expect(isValidUUID(nonExistingId)).toBeTruthy();

        const deleteResultWithNonExistingId = await request(server).delete(`/api/users/${nonExistingId}`);
        
        expect(deleteResultWithNonExistingId.body).toEqual(`Can't find and delete user with id: ${nonExistingId}`);
    });
});
