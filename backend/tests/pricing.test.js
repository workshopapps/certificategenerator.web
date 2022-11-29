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
let testPricingId = "";

describe("Pricing", () => {
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

  test("should successfully create new pricing", async () => {
    const response = await request(app).post("/api/pricing").send({
      type: "basic",
      price: "12000",
      description: "Just pay us",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("plan._id");
    expect(response.body).toHaveProperty("plan.price");
    expect(response.body).toHaveProperty("plan.description");
    expect(response.body).toHaveProperty("plan.type");

    // store id globally to be used later by the update and delete tests
    testPricingId = response.body.plan._id;
  });

  test("should successfully get all pricing", async () => {
    const response = await request(app).get("/api/pricing");

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.plans).toBeDefined();
  });

  test("should successfully get single pricing", async () => {
    const response = await request(app).get(`/api/pricing/${testPricingId}`);

    expect(response.statusCode).toBe(200);
    console.log(response.body);
    expect(response.body.foundPlan).toBeDefined();
  });

  test("should successfully update single pricing", async () => {
    const response = await request(app)
      .put(`/api/pricing/${testPricingId}`)
      .send({ price: "25000" });

    expect(response.statusCode).toBe(200);
    expect(response.body.plan).toBeDefined();
    expect(response.body).toHaveProperty("plan.price", 25000);
  });

  test("should successfully delete career posting with id", async () => {
    const response = await request(app).delete(`/api/pricing/${testPricingId}`);

    expect(response.statusCode).toBe(204);
  });
});
