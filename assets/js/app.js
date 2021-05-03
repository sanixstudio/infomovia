// const OMDB_API_KEY = "7d74346a";
const API_KEY = "1dc3a1bc9c9d1a12ed9931344d82ebc1";
const URL_BASE = "https://api.themoviedb.org/3/";
const URL_IMG = "https://image.tmdb.org/t/p/w185/";
const URL_UPCOMING = `${URL_BASE}movie/upcoming?language=en-US&api_key=${API_KEY}`;
const URL_PLAYING_NOW = `${URL_BASE}movie/now_playing?language=en-US&api_key=${API_KEY}`;
const URL_TOP_RATED = `${URL_BASE}movie/top_rated?language=en-US&api_key=${API_KEY}`;

/************************************************************
    Get All category (Playing Now, Upcoming and Top-rated)
*************************************************************/

const getMoviesCategory = async (category, selector) => {
    try {
        const res = await (await fetch(category)).json();
        searchResultDisplay.innerHTML = "";

        for (let movie of res.results) {
            let thePosterUrl = "";

            movie.poster_path === null ?
                thePosterUrl = "https://via.placeholder.com/185/000000/FFFFFF/?text=NO-IMAGE" :
                thePosterUrl = URL_IMG + movie.poster_path;

            const className = document.querySelector(selector);
            let temp = `<div><img 
                        data-movieId="${movie.id}"
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
    } catch (err) { console.log(err) }

    getModalData()
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
        for (let div of DomElements) div.style.display = "unset";
    });
}

// Hide Modal when click outside modal area

document.addEventListener('click', (e) => {
    const modal_backdrop = document.querySelector('.modal_backdrop')
    if (modal_backdrop.style.display === 'unset') if (e.target.className === 'modal_backdrop') modal_backdrop.style.display = 'none'
});

/************************************************************
                Get Modal Data Function
************************************************************/
function getModalData() {
    let movieId = "";
    let img = "";
    let title = "";
    let popularity = "";
    let vote_average = "";
    let vote_count = "";
    let release_date = "";
    let overview = "";

    const posters = document.querySelectorAll('.poster');

    for (poster of posters) {
        poster.addEventListener('click', (e) => {
            movieId = e.target.attributes["data-movieId"].value
            img = e.target.attributes["data-img"].value
            title = e.target.attributes["data-title"].value
            popularity = e.target.attributes["data-popularity"].value
            vote_average = e.target.attributes["data-vote_average"].value
            vote_count = e.target.attributes["data-vote_count"].value
            overview = e.target.attributes["data-overview"].value
            release_date = e.target.attributes["data-release_date"].value

            let temp = `<div><img src=${img} alt=""></div>
                        <h2 class="title">${title}</h2>
                        <div class="stats-wrapper">
                            <div><label class="stats_label">Popularity:</label><span class="stats">&#8605; ${popularity}</span></div>
                            <div><label class="stats_label">Vote Count:</label><span class="stats">&#9878; ${vote_count}</span></div>
                            <div><label class="stats_label">Average Vote:</label><span class="stats"><i class="fas fa-poll"></i> ${vote_average}</span></div>
                            <div><label class="stats_label">Release Date:</label><span class="stats"><i class="far fa-calendar-alt"></i> ${release_date}</span></div>
                        </div>
                        <h3 class="description_label">&#127916; Overview</h3>
                        <p class="description">${overview}</p>
                        <button class="watchTrailerBtn" onClick=getVideoSource(${movieId})><i class="fas fa-film"></i>Watch Trailer</button>`

            const modal_backdrop = document.querySelector('.modal_backdrop')
            const modal = document.querySelector('.modal')

            modal_backdrop.style.display = "unset"
            modal.innerHTML = temp;

        });
    }
}

async function getVideoSource(id) {
    let YT_Key = "";
    const URL = `https://api.themoviedb.org/3/movie/${id}/videos?&api_key=${API_KEY}`;
    const PreviewLink = `https://www.youtube.com/embed/`
    const modalBackdrop = document.querySelector('.modal_backdrop');

    modalBackdrop.style.display = 'none';

    try {
        const res = await (await fetch(URL)).json();

        console.log(res)

        YT_Key = res.results[0].key;
        const YouTubeLink = `${PreviewLink}${YT_Key}?rel=0`

        const trailerBackdrop = document.querySelector('.trailer_backdrop');
        let iFrame = document.createElement('iframe');
        iFrame.src = YouTubeLink
        iFrame.setAttribute('allowFullScreen', 'true')

        trailerBackdrop.appendChild(iFrame);
        trailerBackdrop.style.display = "unset"

        console.log(modalBackdrop)

    } catch (error) {
        console.log(error.message)
    }
}

const trailerBackdrop = document.querySelector('.trailer_backdrop');
const closeBtn = document.querySelector('.closeBtn');

closeBtn.addEventListener('click', () => {
    const theIframe = document.querySelector('iframe');
    trailerBackdrop.style.display = "none";
    theIframe.src = "";
    stopVideo(document)
});

var stopVideo = function (element) {
    var iframe = element.querySelector('iframe');
    var video = element.querySelector('video');
    if (iframe !== null) {
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc;
    }
    if (video !== null) {
        video.pause();
    }
};