
const apiKey = '829a43a98259bc44cae297489c7e3bba';

// Fetch movie details by ID
function fetchMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=casts,videos,images,releases&language=en-US`;
  return fetch(movieDetailsUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching movie details:', error);
      throw error;
    });
}

function getLanguageName(code) {

  const languageNames = {
    en: 'English',
    ta: 'Tamil',
    hi: 'Hindi',
    ka: 'Kannada',
    te: 'Telugu',
    ml: 'Malayalam'
  };
  
  return languageNames[code] || code;
}




function displayMovieDetails(movie) {
  const movieDetailsContainer = document.getElementById('movieDetails');
  movieDetailsContainer.innerHTML = `
    <div class="movie-details">
      <div class="backdrop" style="background-image: url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')"></div>
      <div class="overlay"></div>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster" class="movie-poster">
      <div class="movie-info">
        <h2 id="movieTitle">${movie.title}</h2>
        <p id="movieOverview"> <strong> Overview: </strong> ${movie.overview}</p>
        <p id="movieProductionCompanies"> <strong> Production Companies: </strong> ${movie.production_companies.map(company => company.name).join(', ')}</p>
        <p id="movieOriginalLanguage"> <strong> Original Language: </strong> ${getLanguageName(movie.original_language)}</p>
        <p id="runtime"> <strong> Runtime: </strong> ${movie.runtime} mins</p>
        <p id="avgVote"> <strong> Rating: </strong><img src="./star.png" width="20" height="15" loading="lazy" alt="rating"/>${movie.vote_average.toFixed(1)}</p>
        <p id="movieReleaseDate"> <strong> Release Date: </strong> ${movie.release_date}</p>
        <p id="movieReleaseYear"> <strong> Year: </strong> ${movie.release_date.split("-")[0]}</p>
        <p id="movieGenre"> <strong> Genre: </strong> ${movie.genres.map(genre => genre.name).join(', ')}</p>  
      </div>
    </div>
  `;
  
}



// Fetch movie details when the page loads
window.addEventListener('load', () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get('id');

  if (movieId) {
    fetchMovieDetails(movieId)
      .then(movie => {
        displayMovieDetails(movie);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
      });
  }
});

