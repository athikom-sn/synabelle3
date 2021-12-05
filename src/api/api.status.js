const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "satania",
});

module.exports = {
    get: async function() {
        return await new Promise(async(resolve, _) => {
            let conn;
            try {
                conn = await pool.getConnection();
                const response = await conn.query("SELECT * FROM `status` LIMIT 1", []);
                resolve(response.length > 0 ? response[0] : { status: false })

            } catch (_) {}
        });
    }
};