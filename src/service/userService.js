import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import bluebird from 'bluebird';

// create the connection to database



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (email, password, username) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, hashPassword, username],
        function (err, results, fields) {
            if (err) {
                console.log('Error: ', err);
            }
        }
    );

}

const getListUser = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    let users = [];
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log('Error: ', e);
    }
}
module.exports = {
    createNewUser,
    getListUser
}