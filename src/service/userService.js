import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '452003',
    database: 'jwt'
});



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

const getListUser = () => {
    let users = [];

    connection.query(
        "SELECT * FROM users",
        function (err, results, fields) {
            if (err) {
                console.log('Error: ', err);
            }
            console.log('check users: ', results);
        }
    );

}
module.exports = {
    createNewUser,
    getListUser
}