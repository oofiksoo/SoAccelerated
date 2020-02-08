const Requests = require("./request-model.js");
const db = require("../database/dbConfig");
const request = require("supertest");
const server = require("../api/server.js");
describe("Requests-Model", function() {
    beforeEach(async() => {
        await db("requests").truncate();
    });
    describe("Environment", function() {
        it("run in test env", function() {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });
    describe("Requests-Model insert", function() {
        it("adds the Request", async function() {
            await Requests.insert({
                request_category: "11",
                request_date: "01/16/2020",
                request_title: "The Test One!",
                request_details: " Problems, But I dont think they are the same as everyone else's problems",
                request_stepstaken: "As few as possible while still achieving the same goal.",
                creatorId: "1",
                helperId: "0",
                resolved: "0"
            });
            const requestdb = await db("requests");
            expect(requestdb).toHaveLength(1);
        });
    });
    describe("Get Requests", function() {
        it("Retruns 200:OK", async function() {
            await request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});