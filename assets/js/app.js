let query = "jumanji";
const OMDB_API_KEY = "7d74346a";
const OMDB_SEARCH_URL = `http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`;
const API_KEY = "1dc3a1bc9c9d1a12ed9931344d82ebc1";
const URL_BASE = "https://api.themoviedb.org/3/";
const URL_IMG = "https://image.tmdb.org/t/p/w185/";
const URL_UPCOMING = `${URL_BASE}movie/upcoming?language=en-US&api_key=${API_KEY}`;
const URL_PLAYING_NOW = `${URL_BASE}movie/now_playing?language=en-US&api_key=${API_KEY}`;
const URL_TOP_RATED = `${URL_BASE}movie/top_rated?language=en-US&api_key=${API_KEY}`;

/************************************************************
    Get All category (Playing Now, Upcoming and Top-rated)
*************************************************************/

let selectedMovie = {};

const getMoviesCategory = async (category, selector) => {
    try {
        const res = await (await fetch(category)).json();

        console.log(res.results);

        for (let movie of res.results) {
            let thePosterUrl = "";

            movie.poster_path === null? 
                thePosterUrl = "https://via.placeholder.com/185/000000/FFFFFF/?text=NO-IMAGE" : 
                thePosterUrl = URL_IMG + movie.poster_path;

            const className = document.querySelector(selector);
            let temp = `<div><img 
                        data-title="${movie.title}"
                        data-popularity="${movie.popularity}"
                        data-img="${thePosterUrl}" 
                        data-overview="${movie.overview}" 
                        data-vote_average="${movie.vote_average}" 
                        data-vote_count="${movie.vote_count}" 
                        data-release_date="${movie.release_date}" 
                        class="poster" src=${thePosterUrl} alt=""></div>`;
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

/************************************************************
                        Navigation
************************************************************/

const allSectionsLink = document.querySelectorAll('#playing_now_link, #upcoming_link, #top_rated_link');
const hero = document.querySelector('.hero');

for (let link of allSectionsLink) {
    link.addEventListener('click', () => {
        hero.style.display = 'flex';
        const DomElements = document.querySelectorAll('#playing_now, #upcoming, #top_rated');
        for(let div of DomElements) div.style.display = "unset";
    });
}

//////////////////////////////////////////////////////////////

document.addEventListener('click', (e) => {
    const modal_backdrop = document.querySelector('.modal_backdrop')


    if (modal_backdrop.style.display === 'unset') {
        console.log(e.target.className);

        if (e.target.className === 'modal_backdrop') modal_backdrop.style.display = 'none';

        // modal stats-wrapper stat_label title description_label description
    }

});