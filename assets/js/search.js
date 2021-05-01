/************************************************************
                Search Movies Information
*************************************************************/
const searchResultDisplay = document.querySelector('.search-results');
const searchForm = document.querySelector('#theForm');
const keywords = document.querySelector('#keywords');

let searchQuery = "";

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    (keywords.value !== "") ?
        searchQuery = keywords.value.trim() :
        alert('Please enter some keywords in the search area before submitting.')

    const URL_SEARCH = `${URL_BASE}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

    try {
        const res = await (await fetch(URL_SEARCH)).json();

        if (res.total_results === 0) {
            let err = document.querySelector('.error-message');
            err.style.display = "unset"
        }

        const DomElements = document.querySelectorAll('.hero, #playing_now, #upcoming, #top_rated');
        for (let div of DomElements) div.style.display = "none";

        searchResultDisplay.innerHTML = "";

        for (let movie of res.results) {
            let thePosterUrl = "";

            movie.poster_path === null ?
                thePosterUrl = "https://via.placeholder.com/185/000000/FFFFFF/?text=NO-IMAGE" :
                thePosterUrl = URL_IMG + movie.poster_path;

            // const main = document.querySelector('main');
            let temp = `<div><img 
                        data-title="${movie.title}"
                        data-popularity="${movie.popularity}"
                        data-img="${thePosterUrl}" 
                        data-overview="${movie.overview}" 
                        data-vote_average="${movie.vote_average}" 
                        data-vote_count="${movie.vote_count}" 
                        data-release_date="${movie.release_date}" 
                        class="poster" src=${thePosterUrl} alt=""></div>`;
            // main.append

            searchResultDisplay.innerHTML += temp;
        }
    } catch (err) { console.log(err) }
    getModalData()
});