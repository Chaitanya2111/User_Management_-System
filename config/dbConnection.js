

// const sql = require('mssql/msnodesqlv8');

// var conn = {
//     server: process.env.SERVER,
//     database: process.env.DATABASE,
//     driver: process.env.DRIVER,
//     options: {
//         trustedConnection: true
//     }

// }



//  sql.connect(conn, function (err) {
//     if (err) throw err;
//     console.log("Database Connected")
// })



const sql = require('mssql/msnodesqlv8');

var conn = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    driver: process.env.DRIVER,
    options: {
        trustedConnection: true
    }
}

const pool = new sql.ConnectionPool(conn);

pool.connect().then(pool => {
    console.log("Database Connected")
}).catch(err => console.error('Database Connection Failed!', err));

module.exports = pool;
