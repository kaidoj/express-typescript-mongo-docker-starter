import { Request } from "express";
import { validate } from "../../src/services/events";

describe("validate", () => {
  const mockReq = {
    body: {
      title: "Test title",
      startTime: "2020-04-15 12:30:00",
      endTime: "2020-04-25 11:00:00"
    }
  } as Request;
  
  it("should return valid", async () => {
    const errors = await validate(mockReq);
    expect(errors.isEmpty()).toBe(true);
  });

  it("should return errors", async () => {
    const errors = await validate({} as Request);
    Object.keys(mockReq.body).forEach((p, i) => {
      expect(errors.array()[i]).toHaveProperty("param", p);
    });
  });
});