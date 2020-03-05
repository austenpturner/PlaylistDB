// Require node modules
const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Sets up the Express App
const app = express();
const PORT = 8800;

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8800,
    user: 'root',
    password: 'Apt0718!',
    database: 'playlistdb'
});

connection.connect(err => {
    if (err) {
        throw err;
    }

    console.log(`connection successful as thread ID: ${connection.threadId}`);
});

// ---------- PATHS ---------- //

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/search", function(req, res) {
    // call sql query functions, return search results
    res.sendFile(path.join(__dirname, "/public/search.html"));
});

app.get("/insert", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/insert.html"));
});

app.get("/update", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/update.html"));
});

app.get("/delete", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/delete.html"));
});

// ---------- SEARCH QUERY ---------- //

const queryBySong = song => {
    connection.query('SELECT * FROM `playlist` WHERE `title` = ?', [song], (err, results) => {
        if (err) {
            throw err;
        }
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                console.log(`Artist: ${results[i].artist}`);
                console.log(`Genre: ${results[i].genre}`);
            }
        } else {
            console.log('Cannot find song.');
        }
    })
}

const queryByArtist = artist => {
    connection.query('SELECT * FROM `playlist` WHERE `artist` = ?', [artist], (err, results) => {
        if (err) {
            throw err;
        }
        let songs = [];
        let genres = [];
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                songs.push(results[i].title);
                genres.push(results[i].genre);
            }
            console.log(`Song(s): ${songs.join(', ')}`);
            console.log(`Genre(s): ${genres.join(', ')}`);
        } else {
            console.log('Cannot find artist.')
        }
    })
}

const queryByGenre = genre => {
    connection.query('SELECT * FROM `playlist` WHERE `genre` = ?', [genre], (err, results) => {
        if (err) {
            throw err;
        }
        let songs = [];
        let artists = [];
        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                songs.push(results[i].title);
                artists.push(results[i].artist);
            }
            console.log(`Artist(s): ${artists.join(', ')}`);
            console.log(`Song(s): ${songs.join(', ')}`);
        } else {
            console.log('Cannot find genre.');
        }
    })
}

// ---------- INSERT ---------- //

const insert = (title, artist, genre) => {
    connection.query(
        'INSERT INTO playlist SET ?',
        {
            artist: artist,
            title: title,
            genre: genre
        },
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.affectedRows);
        }
    )
}

// ---------- UPDATE ---------- //

const updateTitle = (newTitle, oldTitle) => {
    connection.query(
        'UPDATE playlist SET ? WHERE ?',
        [
            {
                title: newTitle
            },
            {
                title: oldTitle
            }
        ],
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
        }
    )
}

const updateArtist = (artist, title) => {
    connection.query(
        'UPDATE playlist SET ? WHERE ?',
        [
            {
                artist: artist
            },
            {
                title: title
            }
        ],
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
        }
    )
}

const updateGenre = (title, genre) => {
    connection.query(
        'UPDATE playlist SET ? WHERE ?',
        [
            {
                title: title
            },
            {
                genre: genre
            }
        ],
        (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results);
        }
    )
}

// ---------- DELETE ---------- //

const deleteItem = title => {
    connection.query(
        'DELETE FROM playlist WHERE title = ?', title, (err, results) => {
            if (err) {
                throw err;
            }
            console.log(results.affectedRow);
        }
    )
}

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("Server listening on PORT " + PORT);
});

