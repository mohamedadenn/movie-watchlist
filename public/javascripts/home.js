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

async function handleSearch(evt) {
    evt.preventDefault();
    const query = searchInputEl.value.replace(/^\s*/, '');
    if (query) {
        const data = await fetch(`/api/search?q=${query}`).then((result) => result.json());
        console.log(data);
        moviesDb = data.reduce((db, movie) => {
            db[movie.imdbID] = movie;
            return db;
        }, {});
        movieElementsDb = {};
        data.forEach((movie) => createMovieElement(movie));
        renderMovieList();
    }
}

async function handleAddMovie(evt) {
    const imdbID = evt.target.getAttribute('data-imdb-id');
    if (imdbID && evt.target.tagName === 'BUTTON') {
        const movie = moviesDb[imdbID];
        try {
            let myMovie = await fetch('/api/my-movies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movie),
            }).then((result) => result.json());
            moviesDb[imdbID].inMyMovies = true;
            renderMovieEl(moviesDb[imdbID]);
        } catch (err) {
            console.error(err);
        }
    }
}

function init() {
    moviesDb = {};
    movieElementsDb = {};
    renderMovieList();
}

function createMovieElement(movie) {
    let el = document.createElement('div');
    el.classList.add('col', "s12", "m9");
    el.innerHTML = movieCardHTML(movie);
    movieElementsDb[movie.imdbID] = el;
}

// returns the inner HTML for a movie element
function movieCardHTML(movie) {
    return `
    <div class="card">
    <div class="card-image">
    <img src="${movie.img}" alt=${movie.title}>
   </div>
   <div class="card-content">
          <p> <span class="card-title">${movie.title}</span></p>
        </div>
      ${
        !__USER_ID__
          ? ''
          : movie.inMyMovies
          ? '<div class="card-action"> <p>Already in your watch list!</p>'
          : `<div class="card-action"> <button data-imdb-id="${movie.imdbID}" class="btn btn-primary">Add to List</button>`
      }
    </div></div>`;
}

function renderMovieEl(movie) {
  if (movieElementsDb[movie.imdbID]) {
    movieElementsDb[movie.imdbID].innerHTML = movieCardHTML(movie);
  }
}

function renderMovieList(movie) {
  moviesListEl.innerHTML = '';
  Object.values(movieElementsDb).forEach((movieElement) => moviesListEl.append(movieElement));
}