const API_KEY = "1dc3a1bc9c9d1a12ed9931344d82ebc1";
const URL_BASE = 'https://api.themoviedb.org/3/';
const URL_IMG = "https://image.tmdb.org/t/p/w185/";
const URL_POSTER = "https://image.tmdb.org/t/p/original/";
const URL_UPCOMING = `${URL_BASE}movie/upcoming?language=en-US&api_key=${API_KEY}`;
const URL_PLAYING_NOW = `${URL_BASE}movie/now_playing?language=en-US&api_key=${API_KEY}`;
const URL_TOP_RATED = `${URL_BASE}movie/top_rated?language=en-US&api_key=${API_KEY}`;
const URL_SEARCH = `${URL_BASE}search/movie?api_key=${API_KEY}&language=en-US&query=${"movieName"}&page=1&include_adult=false`;

/************************************************************
    Get All category (Playing Now, Upcoming and Top-rated)
*************************************************************/

const getMoviesCategory = async (category, selector) => {
    const res = await (await fetch(category)).json();

    for (let movie of res.results) {
        console.log(movie)
        const className = document.querySelector(selector);
        let temp = `<div><img class="poster" src=${URL_IMG + movie.poster_path || "null"} alt=""></div>`;
        className.innerHTML += temp;
    }

}

getMoviesCategory(URL_PLAYING_NOW, ".playing_now")
getMoviesCategory(URL_UPCOMING, '.upcoming')
getMoviesCategory(URL_TOP_RATED, '.top_rated')