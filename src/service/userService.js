import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import bluebird from 'bluebird';

// create the connection to database



const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, password, username) => {
    let hashPassword = hashUserPassword(password);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    await connection.execute("INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, hashPassword, username]);
}

const getListUser = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        console.log('Error: ', e);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    } catch (e) {
        console.log('Error: ', e);
    }
}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        let [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    } catch (e) {
        console.log('Error: ', e);
    }
}

const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '452003',
        database: 'jwt',
        Promise: bluebird
    });

    try {
        await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?',
            [email, username, id]);
    } catch (e) {
        console.log('Error: ', e);
    }
}
module.exports = {
    createNewUser,
    getListUser,
    deleteUser,
    getUserById,
    updateUserInfor
}