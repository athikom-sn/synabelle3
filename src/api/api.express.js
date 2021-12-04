var express = require('express');
var app = express();
var PORT = 3000;
var cors = require('cors')

app.use(cors())
app.use(express.json());

const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "satania",
});

app.get('/get', async function(req, res, next) {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query("SELECT name FROM `coin`", []);
        res.json({ data: response });
    } catch (_) {}
});

app.post('/update', async function(req, res, next) {
    const data = req.body;

    let conn;
    try {
        conn = await pool.getConnection();

        await conn.beginTransaction();

        Array.from(data.coins).forEach(async coin => {
            await conn.query("INSERT INTO  `coin` (`name`) SELECT DISTINCT ? FROM `coin` WHERE NOT EXISTS(SELECT * FROM `coin` WHERE name = ?)", [coin, coin]);
        });

        // Commit Changes
        await conn.commit();

        res.end('12345');
    } catch (err) {
        await conn.rollback();
        console.error(err)
        throw err;
    } finally {
        if (conn) return conn.end();
    }
})

app.listen(PORT, function(err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});