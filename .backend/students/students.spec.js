const Students = require("../students/students-model.js");
const db = require("../database/dbConfig");
const request = require("supertest");
const server = require("../api/server.js");
describe("Students-Model", function() {
    beforeEach(async() => {
        await db("students").truncate();
    });
    describe("Environment", function() {
        it("run in test env", function() {
            expect(process.env.DB_ENV).toBe("testing");
        });
    });
    describe("Students-Model insert", function() {
        it("adds the user", async function() {
            await Students.add({ username: "test", password: "Password" });
            const students = await db("students");
            expect(students).toHaveLength(1);
        });
    });
    describe("Get Students", function() {
        it("Retruns 200:OK", async function() {
            await request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });
    });
});