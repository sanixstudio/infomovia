let query = "jumanji";
const OMDB_API_KEY = "7d74346a";
const OMDB_SEARCH_URL = `http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`;
const API_KEY = "1dc3a1bc9c9d1a12ed9931344d82ebc1";
const URL_BASE = "https://api.themoviedb.org/3/";
const URL_IMG = "https://image.tmdb.org/t/p/w185/";
const NO_IMG_FOUND = `https://via.placeholder.com/150/0000FF/808080 ?Text=NO IMAGE`;
const URL_UPCOMING = `${URL_BASE}movie/upcoming?language=en-US&api_key=${API_KEY}`;
const URL_PLAYING_NOW = `${URL_BASE}movie/now_playing?language=en-US&api_key=${API_KEY}`;
const URL_TOP_RATED = `${URL_BASE}movie/top_rated?language=en-US&api_key=${API_KEY}`;

/************************************************************
    Get All category (Playing Now, Upcoming and Top-rated)
*************************************************************/

const getMoviesCategory = async (category, selector) => {
    try {
        const res = await (await fetch(category)).json();
        for (let movie of res.results) {
            const className = document.querySelector(selector);
            let temp = `<div><img class="poster" src=${
                URL_IMG + movie.poster_path || NO_IMG_FOUND
            } alt=""></div>`;
            className.innerHTML += temp;
        }
    } catch (err) {
        console.log(err);
    }
};

// Display the movies to dom
getMoviesCategory(URL_PLAYING_NOW, ".playing_now");
getMoviesCategory(URL_UPCOMING, ".upcoming");
getMoviesCategory(URL_TOP_RATED, ".top_rated");
