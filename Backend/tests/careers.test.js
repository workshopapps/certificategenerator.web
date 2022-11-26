const {
  test,
  describe,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const request = require("supertest");
const { ConnectDB, DisconnectDB, ClearDB } = require("./testDBConfig");
const app = require("../app");
let testCareerId = "";

describe("Careers", () => {
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

  test("should successfully get all career posting", async () => {
    const response = await request(app).get("/api/careers");

    expect(response.statusCode).toBe(200);
    expect(response.body.response).toBeDefined();
  });

  test("should successfully create new career posting", async () => {
    const response = await request(app).post("/api/careers").send({
      role: "Software Engineer",
      location: "Remote",
      jobType: "Backend Engineer",
      jobDescription: "Just be good",
      countOfOpening: 5,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.response).toBeDefined();
    expect(response.body).toHaveProperty("response.role");
    expect(response.body).toHaveProperty("response._id");
    expect(response.body).toHaveProperty("response.location");
    expect(response.body).toHaveProperty("response.jobType");
    expect(response.body).toHaveProperty("response.jobDescription");
    expect(response.body).toHaveProperty("response.countOfOpening");
    expect(response.body).toHaveProperty("response.availability");

    // store id globally to be used later by the update and delete tests
    testCareerId = response.body.response._id;
  });

  test("should successfully get career posting by id", async () => {
    const response = await request(app).get(`/api/careers/${testCareerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.response).toBeDefined();
  });

  test("should fail to get career posting by id with error 404", async () => {
    const response = await request(app).get(
      `/api/careers/637fd58b98d5fb6c40d9e370`
    );

    expect(response.statusCode).toBe(404);
  });

  test("should successfully update career posting with id", async () => {
    const response = await request(app)
      .put(`/api/careers/${testCareerId}`)
      .send({ role: "Frontend Developer", countOfOpening: 3 });

    expect(response.statusCode).toBe(200);
    expect(response.body.response).toBeDefined();
    expect(response.body).toHaveProperty("response.countOfOpening", 3);
    expect(response.body).toHaveProperty("response.role", "Frontend Developer");
  });

  test("should successfully delete career posting with id", async () => {
    const response = await request(app).delete(`/api/careers/${testCareerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.response).toBeDefined();
  });
});
