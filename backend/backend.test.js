const request = require('supertest');
const app = require('../backend/server');

describe("Search API Test", () => {
    it("should return media search results", async () => {
        const res = await request(app).get('/search/media?q=cats');
        expect(res.statusCode).toEqual(200);
        expect(res.body.results).toBeDefined();
    });
});
