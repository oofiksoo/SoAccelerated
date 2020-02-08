const db = require("../database/dbConfig.js");

module.exports = {
    get,
    getById,
    findById,
    insert,
    update,
    remove,
    findUsersById,
    insertEmail,
    getOpportunityEmail,
    getUserEmail
};

function get() {
    return db("opportunities").orderBy("id", "desc");
}

function getOpportunityEmail(id) {
    return db("opportunities as o")
        .join("opportunities_email as oe", "o.id", "oe.opportunities_id")
        .select("oe.id", "oe.to", "oe.from", "oe.subject", "oe.text", "oe.html")
        .where("oe.opportunities_id", id)
        .orderBy("o.id", "desc");
}

function getUserEmail(id) {
    return db("users")
        .select("email")
        .where("id", id)
        .orderBy("id", "desc");
}

function getById(id) {
    return db("opportunities")
        .where({ id })
        .first();
}

function getByEmailId(id) {
    return db("opportunities_email")
        .where({ id })
        .first();
}

function findUsersById(id) {
    return db("users")
        .where({ id })
        .first();
}

function insert(request) {
    return db("opportunities")
        .insert(opportunitiy)
        .then(ids => {
            return getById(ids[0]);
        });
}

function insertEmail(opportunitiesemail) {
    return db("opportunities_email")
        .insert(opportunitiesemail)
        .then(ids => {
            return getByEmailId(ids[0]);
        });
}

function update(id, changes) {
    return db("opportunities")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("opportunities")
        .where("id", id)
        .del();
}