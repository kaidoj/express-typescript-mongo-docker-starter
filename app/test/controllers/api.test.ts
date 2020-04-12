import request from "supertest";
import app from "../../src/app";
import { API_VERSION } from "../../src/util/secrets";
import Event from "../../src/models/Event";

const prefix = `/api/${API_VERSION}`;
const eventData = {
    title: "Test title",
    startTime: "2020-04-15 12:30:00",
    endTime: "2020-04-25 11:00:00"
};

describe("GET /", () => {
    it("should return 200 OK", async () => {
        await new Event(eventData).save();
        return request(app).get(`${prefix}/`)
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1);
            });
    });
});

describe("GET /:id", () => {
    it("should return 200 OK", async () => {
        const event = await new Event(eventData).save();
        return request(app).get(`${prefix}/${event._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("title", "Test title");
            });;
    });
});

describe("POST /", () => {
    it("should return 200 OK", () => {
        return request(app).post(`${prefix}/`)
            .send({
                title: "Test title 2",
                startTime: "2020-04-15 12:30:00",
                endTime: "2020-04-25 11:00:00"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("title", "Test title 2");
            });;
    });
});

describe("PUT /:id", () => {
    it("should return 200 OK", async () => {
        const event = await new Event(eventData).save();
        return request(app).put(`${prefix}/${event._id}`)
            .send({
                title: "Test title 3",
                startTime: "2020-04-15 12:30:00",
                endTime: "2020-04-25 11:00:00"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("title", "Test title 3");
            });
    });
});

describe("DELETE /:id", () => {
    it("should return 200 OK", async () => {
        const event = await new Event(eventData).save();
        return request(app).delete(`${prefix}/${event._id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body).toHaveProperty("deleted", true);
            });;
    });
});
