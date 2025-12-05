import mysql from 'mysql2/promise.js';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'leitura_livre_db',
    port: 3301,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
