const connection = require('./connection.js');

const orm = {
    search: function(col, value, cb) {
        connection.query('SELECT * FROM playlist WHERE ?? = ?', 
        [col, value],
        (err, data) => {
            if (err) {
                throw err;
            }
            cb(data);
        });
    },
    insert: function(firstColVal, secondColVal, thirdColVal, cb) {
        connection.query('INSERT INTO playlist (title, artist, genre) VALUES (?, ?, ?)',
        [firstColVal, secondColVal, thirdColVal],
        (err, result) => {
            if (err) {
            throw err;
            }
            cb(result);
        });
    },
    update: function(col, setVal, col, whereVal, cb) {
        connection.query('UPDATE playlist SET ?? = ? WHERE ?? = ?',
        [col, setVal, col, whereVal],
        (err, result) => {
            if (err) {
            throw err;
            }
            cb(result);
        });
    },
    delete: function(value, cb) {
        connection.query('DELETE FROM playlist WHERE title = ?',
        [value],
        (err, result) => {
            if (err) {
            throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;







