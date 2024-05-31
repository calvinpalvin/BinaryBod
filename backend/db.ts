import mysql from 'mysql';

export const initializeDatabase = (): mysql.Pool => {
    const pool = mysql.createPool({
        connectionLimit: 10, // Set the connection limit or other pool settings
        host: 'localhost',
        user: 'test',
        password: 'test',
        database: 'binaryBod'
    });

    pool.on('acquire', (connection) => {
        console.log('Connection %d acquired', connection.threadId);
    });

    pool.on('release', (connection) => {
        console.log('Connection %d released', connection.threadId);
    });

    return pool;
};
