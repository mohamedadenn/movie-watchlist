const BASE_URL = '/api/search';

// app state
let moviesDb, movieElementsDb;

// cache elements
const moviesListEl = document.getElementById('movies-list');
const searchFormEl = document.getElementById('search-form');
const searchInputEl = document.querySelector('#search-form input');

// events listeners
searchFormEl.addEventListener('submit', handleSearch);
moviesListEl.addEventListener('click', handleAddMovie);

// functions
init();

// Event Listeners
async function handleSearch(evt) {
    evt.preventDefault();
    console.log(searchInputEl.value)
    const query = searchInputEl.value.replace(/\s*/g, '');

    if (query) {
        const data = fetch(`/api/search?q=${query}`)
            .then((res) => res.json());
    }
}

// Functions


init()

// Ref to search button

// Ref to input

//