const mariadb = require('mariadb');

const pool = mariadb.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "webapp",
    password: "monsupermotdepasse",
    database: "session_test"
});

module.exports = pool;
