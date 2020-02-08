const db = require("../data/db-Config.js");

module.exports = {
    add,
    find,
    findBy,
    findById,
    getStudentRequests,
    addimage,
    update
};

function find() {
    return db("students").select("id", "username", "email");
}

function findBy(filter) {
    return db("students").where(filter);
}

async function add(student) {
    const [id] = await db("students").insert(student);

    return findById(id);
}

function findById(id) {
    return db("students")
        .where({ id })
        .first();
}

function update(id, changes) {
    return db("students")
        .where({ id })
        .update(changes);
}

function addimage(id, file) {
    return db("students")
        .where({ id })
        .update({ file });
}

function getStudentRequests(id) {
    return db("requests as r")
        .join("students as s", "s.id", "r.creatorId")
        .select(
            "r.id",
            "r.request_category",
            "r.request_date",
            "r.request_title",
            "r.request_details",
            "r.request_stepstaken",
            "s.id as creatorid",
            "r.helperId",
            "r.resolved"
        )
        .where("r.creatorId", id)
        .orderBy("r.id", "asc");
}