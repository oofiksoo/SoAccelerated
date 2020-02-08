const db = require("../data/db-config.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    imgUrl,
    update
};

function find() {
    return db("users").select("id", "username");
}

function findBy(filter) {
    return db("users").where(filter);
}

async function add(user) {
    const [id] = await db("users").insert(user);

    return findById(id);
}

function findById(id) {
    return db("users")
        .where({ id })
        .first();
}

function update(id, changes) {
    return db("users")
        .where({ id })
        .update(changes);
}

function imgUrl(id, url) {
    return db("users")
        .where({ id })
        .update(url);
}