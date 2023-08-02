

// Your API Key from TMDb
const apiKey = '829a43a98259bc44cae297489c7e3bba';

const recentMoviesRow = document.getElementById('recentMoviesRow');
const topRatedMoviesRow = document.getElementById('topRatedMoviesRow');
const upcomingMoviesRow = document.getElementById('upcomingMoviesRow');

const totalPages = 5;

// Function to fetch and display movie thumbnails for a specific category
async function displayMovieThumbnails(category, container) {
  for (let page = 1; page <= totalPages; page++) {
    const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&region=IN&with_original_language=ta|hi|ka|te|ml&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const movies = data.results;

      // Process movie data and create thumbnail elements
      movies.forEach(movie => {
        const thumbnailElement = createThumbnailElement(movie);
        container.appendChild(thumbnailElement);
      });
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }
}

// Function to create a single movie thumbnail element
function createThumbnailElement(movie) {
  const thumbnailElement = document.createElement('div');
  thumbnailElement.classList.add('homeThumbnail');

  thumbnailElement.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
    <p class="title">${movie.title}</p>
         
          <div class="meta-list">
               <div class="meta-item">
                   <img
                   src="./star.png"
                   width="20"
                   height="18"
                   loading="lazy"
                   alt="rating"
                   />
               <span class="span">${movie.vote_average.toFixed(1)}</span>
           </div>

           <div class="card-badge">${movie.release_date.split("-")[0]}</div>
           </div>
  `;


   thumbnailElement.addEventListener('click', () => {
   window.location.href = `movie_details.html?id=${movie.id}`;
   });

 

  return thumbnailElement;
}


displayMovieThumbnails('now_playing', recentMoviesRow);
displayMovieThumbnails('top_rated', topRatedMoviesRow);
displayMovieThumbnails('upcoming', upcomingMoviesRow);






// Search functionality 
function searchMovies(query) {
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&region=IN&query=${query}&adult=false`;
  return fetch(searchUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Error fetching search results:', error);
      throw error;
    });
}

function displaySearchResults(movies) {
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  movies.forEach(movie => {
    const thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');

    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = 'Movie Poster';

    thumbnail.appendChild(img);

    thumbnail.addEventListener('click', () => {
      window.location.href = `movie_details.html?id=${movie.id}`;
    });

    searchResultsContainer.appendChild(thumbnail);
  });
}

 // Handle search button click event
document.getElementById('searchButton').addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput.value.trim();


    
    if (query !== '') {
     
      searchMovies(query)
        .then(searchResults => {
          displaySearchResults(searchResults.results);

          console.log('Search button clicked!');

        
          document.getElementById('topRatedMoviesSection').style.display = 'none';
          document.getElementById('recentMoviesSection').style.display = 'none';
          document.getElementById('upcomingMoviesSection').style.display = 'none';
          document.getElementById('searchResultsSection').style.display = 'block';
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  });

  

document.getElementById('backButton').addEventListener('click', () => {

  document.getElementById('topRatedMoviesSection').style.display = 'block';
  document.getElementById('recentMoviesSection').style.display = 'block';
  document.getElementById('upcomingMoviesSection').style.display = 'block';
  document.getElementById('searchResultsSection').style.display = 'none';
});





