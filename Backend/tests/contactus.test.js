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

describe("Contact", () => {
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

  test("should successfully create a contact form", async () => {
    const response = await request(app).post(`/api/contactus`).send({
      firstName: "Comedian",
      lastName: "Remote",
      phoneNumber: "08105555000",
      message: "Hello",
      email: "mail@hng.com",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body).toHaveProperty("newContact._id");
    expect(response.body).toHaveProperty("newContact.email");
    expect(response.body).toHaveProperty("newContact.message");
  });

  test("should fail to create a contact form with 400", async () => {
    // Mock request to /api/contactus with wrong request body
    const response = await request(app).post(`/api/contactus`).send({
      firs_tname: "Comedian",
      message: "Hello",
      email: "fake@hng.com",
    });

    expect(response.statusCode).toBe(400);
  });

  test("should successfully get all contacts", async () => {
    const response = await request(app).get(`/api/contactus`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.contacts).toBeDefined();
  });
});
