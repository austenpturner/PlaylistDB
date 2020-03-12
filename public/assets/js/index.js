// Insert DOM Elements
const btnInsert = document.getElementById('insert-btn');
const insertTitleInput = document.getElementById('insert-title');
const insertArtistInput = document.getElementById('insert-artist');
const insertGenreInput = document.getElementById('insert-genre');
const insertMsg = document.getElementById('insert-msg');

// Search DOM Elements
const searchRadioContainer = document.getElementById('search-radio-container');
const radioSearchTitle = document.getElementById('title-search');
const radioSearchArtist = document.getElementById('artist-search');
const radioSearchGenre = document.getElementById('genre-search');
const searchInputEl = document.getElementById('search-input');
const searchLabel = document.getElementById('search-label');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');

// Update DOM Elements
const updateRadioContainer = document.getElementById('update-radio-container');
const radioUpdateTitle = document.getElementById('title-update');
const radioUpdateArtist = document.getElementById('artist-update');
const radioUpdateGenre = document.getElementById('genre-update');
const refInput = document.getElementById('ref-input');
const updateInput = document.getElementById('update-input');
const refLabel = document.getElementById('ref-label');
const updateLabel = document.getElementById('update-label');
const updateBtn = document.getElementById('update-btn');
const updateMsg = document.getElementById('update-msg');

// Delete DOM Elements
const deleteTitleInput = document.getElementById('title-delete');
const deleteBtn = document.getElementById('delete-btn');
const deleteMsg = document.getElementById('delete-msg');

window.onload = () => {
    const currentPage = document.querySelector('main').getAttribute('id');
    switch(currentPage) {
        case 'search-page' :
            searchListeners();
            break;
        case 'update-page' : 
            updateListeners();
            break;
        case 'insert-page' :
            insertListeners();
            break;
        case 'delete-page' :
            deleteListeners();
            break;
    };
};

const updateListeners = () => {
    updateRadioContainer.addEventListener('click', function(e) {
        if (e.target.id === 'title-update') {
            refLabel.textContent = 'Enter Current Title';
            updateLabel.textContent = 'Enter New Title';
        } else if (e.target.id === 'artist-update') {
            refLabel.textContent = 'Enter Song Title';
            updateLabel.textContent = 'Enter Updated Artist';
        } else if (e.target.id === 'genre-update') {
            refLabel.textContent = 'Enter Song Title';
            updateLabel.textContent = 'Enter Updated Genre';
        };
    });
    
    updateBtn.addEventListener('click', e => {
        e.preventDefault();
        const where = refInput.value;
        const set = updateInput.value;
        const updateData = {
            type: getUpdateType(),
            where: where,
            set: set
        };
        console.log(updateData);
        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }).then ( res => {
            return res.json();
        }).then( data => {
            console.log(data);
            if (data > 0) {
                updateMsg.textContent = `Update successful!`;
            } else {
                updateMsg.textContent = `Sorry, nothing was updated`;
            };
        });
    });
};

const insertListeners = () => {
    btnInsert.addEventListener('click', e => {
        e.preventDefault();
        const title = insertTitleInput.value.trim();
        const artist = insertArtistInput.value.trim();
        const genre = insertGenreInput.value.trim();
        const insertData = {
            title: title,
            artist: artist,
            genre: genre
        };
        fetch(`/api/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insertData)
        }).then( res => {
            return res.json();
        }).then( data => {
            if (data > 0) {
                insertMsg.textContent = `Your song has successfully been inserted into the database!`;
            } else {
                insertMsg.textContent = `Sorry, your song was not inserted into the database.`;
            };
        });
    });
};

const deleteListeners = () => {
    deleteBtn.addEventListener('click', e => {
        e.preventDefault();
        const title = deleteTitleInput.value;
        fetch(`/delete/${title}`, {
            method: 'DELETE'
        }).then( res => {
            return res.json();
        }).then ( data => {
            if (data > 0) {
                deleteMsg.textContent = `Deleted ${title} from database.`
            } else {
                deleteMsg.textContent = `Nothing found to delete.`
            };
            deleteTitleInput.value = '';
        });
    });
};

const searchListeners = () => {
    searchRadioContainer.addEventListener('click', function(e) {
        resultsContainer.textContent = '';
        if (e.target.id === 'title-search') {
            searchLabel.textContent = 'Enter Title';
        } else if (e.target.id === 'artist-search') {
            searchLabel.textContent = 'Enter Artist';
        } else if (e.target.id === 'genre-search') {
            searchLabel.textContent = 'Enter Genre';
        };
    });

    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const searchValue = searchInputEl.value.trim();
        const searchData = {
            type: getSearchType(),
            value: searchValue
        }; 
        fetch('/search', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        }).then( res => {
            console.log(res);
            return res.json();
        }).then( data => {
            console.log(data);
            if (getSearchType() === 'title') {
                if (data.length > 0) {
                    renderTitleResults(data);
                } else {
                    renderNoResults();
                };
            } else if (getSearchType() === 'artist') {
                if (data.length > 0) {
                    renderArtistResults(data);
                } else {
                    renderNoResults();
                };
            } else {
                if (data.length > 0) {
                    renderGenreResults(data);
                } else {
                    renderNoResults();
                };
            };
            searchInputEl.value = '';
            console.log('sent'); 
        });
    });
};

const getSearchType = () => {
    const searchString = ((searchBtn.previousElementSibling).firstElementChild).textContent;
    let searchType;
    if (searchString === 'Enter Title') {
        searchType = 'title';
    } else if (searchString == 'Enter Artist') {
        searchType = 'artist';
    } else {
        searchType = 'genre';
    };
    return searchType;
};

const getUpdateType = () => {
    const updateString = ((updateBtn.previousElementSibling).firstElementChild).textContent;
    let updateType;
    if (updateString === 'Enter Current Title') {
        updateType = 'title';
    } else if (updateString === 'Enter Song Title') {
        updateType = 'artist';
    } else {
        updateType = 'genre';
    };
    return updateType;
};

const renderArtistResults = data => {
    let songs = [];
    let genres = [];
    for (let i = 0; i < data.length; i++) {
        songs.push(` ${data[i].title}`);
        genres.push(` ${data[i].genre}`);
    };

    const songUl = document.createElement('ul');
    songUl.textContent = `Song(s):`;
    for (let i = 0; i < songs.length; i++) {
        let songLi = document.createElement('li');
        songLi.textContent = songs[i];
        songUl.appendChild(songLi);
    };
    resultsContainer.appendChild(songUl);

    const genreUl = document.createElement('ul');
    genreUl.textContent = `Genre(s):`;
    for (let i = 0; i < genres.length; i++) {
        let genreLi = document.createElement('li');
        genreLi.textContent = genres[i];
        genreUl.appendChild(genreLi);
    };
    resultsContainer.appendChild(genreUl);
};

const renderGenreResults = data => {
    let songs = [];
    let artists = [];
    for (let i = 0; i < data.length; i++) {
        songs.push(` ${data[i].title}`);
        artists.push(` ${data[i].artist}`);
    };

    const songUl = document.createElement('ul');
    songUl.textContent = `Songs:`;
    for (let i = 0; i < songs.length; i++) {
        let songLi = document.createElement('li');
        songLi.textContent = songs[i];
        songUl.appendChild(songLi);
    };
    resultsContainer.appendChild(songUl);

    const artistUl = document.createElement('ul');
    artistUl.textContent = `Artists:`;
    for (let i = 0; i < artists.length; i++) {
        let artistLi = document.createElement('li');
        artistLi.textContent = artists[i];
        artistUl.appendChild(artistLi);
    };
    resultsContainer.appendChild(artistUl);
};

const renderTitleResults = data => {
    const title = data[0].title;
    const artist = data[0].artist;
    const genre = data[0].genre;
    const titleEl = document.createElement('p');
    const artistEl = document.createElement('p');
    const genreEl = document.createElement('p');
    titleEl.textContent = `Title: ${title}`;
    artistEl.textContent = `Artist: ${artist}`;
    genreEl.textContent = `Genre: ${genre}`;
    resultsContainer.appendChild(titleEl);
    resultsContainer.appendChild(artistEl);
    resultsContainer.appendChild(genreEl);
};

const renderNoResults = () => {
    const messageEl = document.createElement('p');
    messageEl.textContent = `No results for that search`;
    resultsContainer.appendChild(messageEl);
};