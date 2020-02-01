const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dbConnection = require("../data/db-config.js");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");
const ProjectsRouter = require("../projects/project-router.js");
const ResourcesRouter = require("../resources/resource-router.js");
const server = express();
const validateLogin = require("../auth/validateLogin.js");
const { jwtSecret } = require("../config/secrets.js");

const sessionConfig = {
    name: "CTFcookie01",
    secret: jwtSecret || "Secret-String",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: "sessions",
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 12000000
    })
};
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.use("/api/auth", authRouter);
server.use("/api/users", validateLogin, usersRouter);
server.use("/api/projects", validateLogin, ProjectsRouter);
server.use("/api/resources", validateLogin, ResourcesRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

module.exports = server;