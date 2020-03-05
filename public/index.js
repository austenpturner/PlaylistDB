// Search DOM Elements
const searchRadioContainer = document.getElementById('search-radio-container');
const radioSearchTitle = document.getElementById('title-search');
const radioSearchArtist = document.getElementById('artist-search');
const radioSearchGenre = document.getElementById('genre-search');
const searchInput = document.getElementById('search-input');
const searchLabel = document.getElementById('search-label');
const btnSearch = document.getElementById('search-btn');

// Insert DOM Elements
const btnInsert = document.getElementById('insert-btn');
const insertTitleInput = document.getElementById('insert-title');
const insertArtistInput = document.getElementById('insert-artist');
const insertGenreInput = document.getElementById('insert-genre');

// Update DOM Elements
const updateRadioContainer = document.getElementById('update-radio-container');
const radioUpdateTitle = document.getElementById('title-update');
const radioUpdateArtist = document.getElementById('artist-update');
const radioUpdateGenre = document.getElementById('genre-update');
const refInput = document.getElementById('ref-input');
const updateInput = document.getElementById('update-input');
const refLabel = document.getElementById('ref-label');
const updateLabel = document.getElementById('update-label');
const btnUpdate = document.getElementById('update-btn');

// Delete DOM Elements
const deleteTitleInput = document.getElementById('title-delete');
const btnDelete = document.getElementById('delete-btn');

window.onload = () => {
    const currentPage = document.querySelector('body').getAttribute('id');
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
    }
}

const searchListeners = () => {
    searchRadioContainer.addEventListener('click', function(e) {
        if (e.target.id === 'title-search') {
            searchLabel.textContent = 'Enter Title';
        } else if (e.target.id === 'artist-search') {
            searchLabel.textContent = 'Enter Artist';
        } else if (e.target.id === 'genre-search') {
            searchLabel.textContent = 'Enter Genre';
        }
      });
    
    btnSearch.addEventListener('click', function(e) {
        e.preventDefault();
        const value = searchInput.value;
        console.log(value);
    });
};

const updateListeners = () => {
    updateRadioContainer.addEventListener('click', function(e) {
        if (e.target.id === 'title-update') {
            refLabel.textContent = 'Enter Current Song Title';
            updateLabel.textContent = 'Enter New Song Title';
        } else if (e.target.id === 'artist-update') {
            refLabel.textContent = 'Enter Target Song Title';
            updateLabel.textContent = 'Enter Updated Song Artist';
        } else if (e.target.id === 'genre-update') {
            refLabel.textContent = 'Enter Target Song Title';
            updateLabel.textContent = 'Enter Updated Song Genre';
        }
    });
    
    btnUpdate.addEventListener('click', e => {
        e.preventDefault();
        console.log(refInput.value);
        console.log(updateInput.value);
    });
};

const insertListeners = () => {
    btnInsert.addEventListener('click', e => {
        e.preventDefault();
        const title = insertTitleInput.value;
        const artist = insertArtistInput.value;
        const genre = insertGenreInput.value;
        console.log(title, artist, genre);
    })
}

const deleteListeners = () => {
    btnDelete.addEventListener('click', e => {
        e.preventDefault();
        const title = deleteTitleInput.value;
        console.log(title);
    })
}
  
