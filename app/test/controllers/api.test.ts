import request from "supertest";
import app from "../../src/app";
import { API_VERSION } from "../../src/util/secrets";

const prefix = `/api/${API_VERSION}`;

describe("GET /", () => {
    it("should return 200 OK", () => {
        return request(app).get(`${prefix}/`)
            .expect(200);
    });
});

describe("GET /:id", () => {
    it("should return 200 OK", () => {
        return request(app).get(`${prefix}/123`)
            .expect(200);
    });
});

describe("POST /", () => {
    it("should return 200 OK", () => {
        return request(app).post(`${prefix}/`)
            .expect(200);
    });
});

describe("PUT /:id", () => {
    it("should return 200 OK", () => {
        return request(app).put(`${prefix}/123`)
            .expect(200);
    });
});

describe("DELETE /:id", () => {
    it("should return 200 OK", () => {
        return request(app).delete(`${prefix}/123`)
            .expect(200);
    });
});
