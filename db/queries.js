const pool = require('../db/pool');

const getMessages = async () => {
    const { rows } = await pool.query(
        'SELECT username, message, added FROM users JOIN messages ON users.id = messages.userid',
    );
    return rows;
};

const insertMessage = async (messageDetails) => {
    const { userid, message } = messageDetails;
    await pool.query('INSERT INTO messages (userid, message) VALUES ($1, $2)', [userid, message]);
};

const insertUser = async (userDetails) => {
    const { firstName, lastName, hashedPassword, username } = userDetails;
    await pool.query(
        'INSERT INTO users (username, password, firstname, lastname, memberstatus, isadmin) VALUES ($1,$2,$3,$4,$5,$6)',
        [username, hashedPassword, firstName, lastName, false, false],
    );
};

const updateMemberStatus = async (userid) => {
    await pool.query('UPDATE users SET memberstatus = true WHERE id = ($1)', [userid]);
};

module.exports = { insertUser, getMessages, insertMessage, updateMemberStatus };
