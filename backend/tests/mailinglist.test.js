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

describe("MailingList", () => {
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

  test("should successfully get emails in mailinglist", async () => {
    const response = await request(app).get("/api/mailinglists");

    expect(response.statusCode).toBe(200);
    expect(response.body.response).toBeDefined();
  });

  test("should successfully add new email to mailing list", async () => {
    const response = await request(app).post("/api/mailinglists").send({
      email: "bola@gmail.com",
    });

    console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("should fail to delete email from mailing list", async () => {
    const response = await request(app).delete(
      `/api/mailinglists/637fd58b98d5fb6c40d9e370`
    );

    expect(response.statusCode).toBe(404);
  });
});
