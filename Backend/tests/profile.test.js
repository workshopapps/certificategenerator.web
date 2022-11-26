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
let testUserId = "";
let testProfileId = "";

describe("Profile", () => {
  // Run this before running any auth test
  beforeAll(async () => {
    // Connect to test database
    await ConnectDB(process.env.MONGO_URI_TEST);

    // Drop all collections in the db
    await ClearDB();

    // Store test user id globally for use by tests
    testUserId = await createTestUser();
  });

  // Run this after all auth tests have been executed
  afterAll(async () => {
    // Drop all collections in the db
    await ClearDB();
    // Disconnect from database
    await DisconnectDB();
  });

  test("should successfully create a user profile", async () => {
    const response = await request(app).post(`/api/profile`).send({
      userId: testUserId,
      name: "Bola Tinubu",
      job: "Frontend Dev",
      location: "London",
      email: "sanjay@misra.com",
      phoneNumber: "+2331234567890",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.profile).toBeDefined();
    expect(response.body).toHaveProperty("profile.job");
    expect(response.body).toHaveProperty("profile._id");
    expect(response.body).toHaveProperty("profile.userId");
    expect(response.body).toHaveProperty("profile.name");
    expect(response.body).toHaveProperty("profile.location");
    expect(response.body).toHaveProperty("profile.phoneNumber");

    testProfileId = response.body.profile._id;
  });

  test("should successfully update user details", async () => {
    const response = await request(app)
      .put(`/api/profile/${testProfileId}`)
      .send({ email: "seyi@hng.com", userId: testUserId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("updatedProfile._id");
    expect(response.body).toHaveProperty("updatedProfile.job");
    expect(response.body).toHaveProperty("updatedProfile.userId");
    expect(response.body).toHaveProperty("updatedProfile.name");
    expect(response.body).toHaveProperty("updatedProfile.location");
    expect(response.body).toHaveProperty("updatedProfile.phoneNumber");
    expect(response.body).toHaveProperty(
      "updatedProfile.email",
      "seyi@hng.com"
    );
  });

  test("should successfully to get profile by id", async () => {
    const response = await request(app).get(`/api/profile/${testProfileId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.profile).toBeDefined();
  });

  test("should fail to get profile by id", async () => {
    const response = await request(app).get(
      `/api/profile/637ff84d5efe688314876d42`
    );

    expect(response.statusCode).toBe(404);
  });

  test("should successfully delete profile with id", async () => {
    const response = await request(app).delete(`/api/careers/${testProfileId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBeDefined();
  });
});

// This function creates a new test user and returns the test user id
async function createTestUser() {
  // Create test user in database and return the user id
  const response = await request(app).post("/api/auth/signup").send({
    email: "bola@gmail.com",
    password: "somesimplepassword123",
  });

  return response.body.id;
}
