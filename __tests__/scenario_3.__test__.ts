const request = require('supertest');
import { server } from '../index';

const nonExistentEndpointResponce = "Sorry! Looks like I can't resolve this route.";

describe('Scenario #3 endpoints should handle non existent endpoints and handle invalid data', () => {
    afterEach(async () => {
        await server.close()
      })

    it('tests GET method non existent endpoint', async () => {
        const response = await request(server).get("/api/nonExistentEndpoint");
        
        expect(response.body).toEqual(nonExistentEndpointResponce);
    });

    it('tests POST method non existent endpoint', async () => {
        const response = await request(server).post("/api/nonExistentEndpoint").send({username: 'Tom', age: 12, hobbies: []});
        
        expect(response.body).toEqual(nonExistentEndpointResponce);
    });

    it('tests PUT method non existent endpoint', async () => {
        const response = await request(server).post("/api/nonExistentEndpoint").send({username: 'Tom', age: 12, hobbies: []});
        
        expect(response.body).toEqual(nonExistentEndpointResponce);
    });

    it('tests DELETE method non existent endpoint', async () => {
        const response = await request(server).delete("/api/nonExistentEndpoint");
        
        expect(response.body).toEqual(nonExistentEndpointResponce);
    });

    it('handle invalid data POST method', async () => {
        const response = await request(server).post("/api/users").send({username: 'Tom', age: '12', hobbies: []});
        
        expect(response.body).toEqual("Sorry! Data is invalid. Note: username(sting), age(number), hobbies([] or [] of strings) are REQUIRED!)");
    });
});
