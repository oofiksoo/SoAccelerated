const db = require("../database/dbConfig.js");

module.exports = {
    get,
    getById,
    findById,
    insert,
    update,
    remove,
    insertemail,
    getRequestEmail,
    getStudentEmail
};

function get() {
    return db("requests").orderBy("id", "desc");
}

function getRequestEmail(id) {
    return db("requests as r")
        .join("request_email as e", "r.id", "e.request_id")
        .select("e.id", "e.to", "e.from", "e.subject", "e.text", "e.html")
        .where("e.request_id", id)
        .orderBy("r.id", "desc");
}

function getStudentEmail(id) {
    return db("students")
        .select("email")
        .where("id", id)
        .orderBy("id", "desc");
}

function getById(id) {
    return db("requests")
        .where({ id })
        .first();
}

function getByEmailId(id) {
    return db("request_email")
        .where({ id })
        .first();
}

function findById(id) {
    return db("students")
        .where({ id })
        .first();
}

function insert(request) {
    return db("requests")
        .insert(request)
        .then(ids => {
            return getById(ids[0]);
        });
}

function insertemail(requestemail) {
    return db("request_email")
        .insert(requestemail)
        .then(ids => {
            return getByEmailId(ids[0]);
        });
}

function update(id, changes) {
    return db("requests")
        .where({ id })
        .update(changes);
}

function remove(id) {
    return db("requests")
        .where("id", id)
        .del();
}