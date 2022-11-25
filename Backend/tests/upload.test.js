const { test, describe, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const path = require("path");

describe("Upload", () => {
  test("should successfully upload csv for unauthorised user", async () => {
    const response = await request(app)
      .post("/api/upload/csv")
      .attach("file", path.resolve(__dirname, "./testfiles/good.csv"));
    expect(response.statusCode).toBe(200);
  });

  test("should fail due to wrong file format", async () => {
    const response = await request(app)
      .post("/api/upload/csv")
      .attach("file", path.resolve(__dirname, "./testFiles/bad.pdf"));
    expect(response.statusCode).toBe(422);
  });

  test("should fail due to bad csv headers", async () => {
    const response = await request(app)
      .post("/api/upload/csv")
      .attach("file", path.resolve(__dirname, "./testFiles/bad.csv"));
    expect(response.statusCode).toBe(400);
  });
});
