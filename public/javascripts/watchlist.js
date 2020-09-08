// cache elements
const moviesListEl = document.getElementById('movies-list');

moviesListEl.addEventListener('click', handleRemoveMovie);

async function handleRemoveMovie(evt) {
    const id = evt.target.getAttribute('data-id');
    if (id && evt.target.tagName === 'BUTTON') {
        try {
            let removedMovieId = await fetch('/api/my-movies/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            }).then((result) => result.json());
            removeMovie(removedMovieId);
        } catch (err) {
            console.error(err);
        }
    }
}

function removeMovie(id) {
    let el = document.getElementById('movie-' + id);
    if (el) {
        el.remove();
    }
}