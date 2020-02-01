const db = require("../data/db-config.js");

function get() {
    return db("resources");
}

function getById(id) {
    return db("resources").where({ id });
}

function add(resource) {
    return db("resources").insert(resource);
}

module.exports = {
    get,

    getById,

    add
};