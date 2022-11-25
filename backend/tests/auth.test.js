require("dotenv").config();
const {
  test,
  describe,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const { ConnectDB, DisconnectDB, ClearDB } = require("./testDBConfig");
const testUserEmail = "user@hng.com";
const testPassword = "abc12345";

describe("Auth", () => {
  // Run this before running any auth test
  beforeAll(async () => {
    // Connect to test database
    await ConnectDB(process.env.MONGO_URI_TEST);
    // Drop all collections in the db
    await ClearDB();
  });

  // Run this after all auth tests have been executed
  afterAll(async () => {
    // Drop all collections in the db
    await ClearDB();
    // Disconnect from database
    await DisconnectDB();
  });

  test("should successfully signup user", async () => {
    // Make request to /api/auth/signup endpoint
    const response = await request(app).post("/api/auth/signup").send({
      email: testUserEmail,
      password: testPassword,
    });

    // Test for success response
    expect(response.statusCode).toBe(201);

    // Test response body
    expect(response.body.id).toBeDefined();
    expect(response.body.email).toBe(testUserEmail);
  });

  test("should fail to signup user with error 422", async () => {
    // Make request to /api/auth/signup endpoint
    const response = await request(app).post("/api/auth/signup").send({
      password: testPassword,
    });

    // Test for success response
    expect(response.statusCode).toBe(422);
  });

  test("should successfully login user", async () => {
    // Make request to /api/auth/login endpoint
    const response = await request(app).post("/api/auth/login").send({
      email: testUserEmail,
      password: testPassword,
    });

    // Test for success response
    expect(response.statusCode).toBe(201);

    // Test response body
    expect(response.body.message).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.userId).toBeDefined();
  });

  test("should fail to login user 401", async () => {
    // Make request to /api/auth/login endpoint
    const response = await request(app).post("/api/auth/login").send({
      email: testUserEmail,
      password: "wrongpassworde",
    });

    // Test for success response
    expect(response.statusCode).toBe(401);
  });
});
