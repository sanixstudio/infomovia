const genres =  [
    {
        id: 12,
        name: "Adventure"
    },
    {
        id: 14,
        name: "Fantasy"
    },
    {
        id: 16,
        name: "Animation"
    },
    {
        id: 18,
        name: "Drama"
    },
    {
        id: 27,
        name: "Horror"
    },
    {
        id: 28,
        name: "Action"
    },
    {
        id: 35,
        name: "Comedy"
    },
    {
        id: 36,
        name: "History"
    },
    {
        id: 37,
        name: "Western"
    },
    {
        id: 53,
        name: "Thriller"
    },
    {
        id: 80,
        name: "Crime"
    },
    {
        id: 99,
        name: "Documentary"
    },
    {
        id: 878,
        name: "Science Fiction"
    },
    {
        id: 9648,
        name: "Mystery"
    },
    {
        id: 10402,
        name: "Music"
    },
    {
        id: 10749,
        name: "Romance"
    },
    {
        id: 10751,
        name: "Family"
    },
    {
        id: 10752,
        name: "War"
    },
    {
        id: 10770,
        name: "TV Movie"
    }
]

async function getMoviesForGenre(id=14) {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}`

    try {
        const res = await (await fetch(URL)).json();
        // console.log(res.results);
        const DomElements = document.querySelectorAll('.hero, #playing_now, #upcoming, #top_rated');
        for (let div of DomElements) div.style.display = "none";
        searchResultDisplay.innerHTML = "";

        for (let movie of res.results) {
            let thePosterUrl = "";

            movie.poster_path === null ?
                thePosterUrl = "https://via.placeholder.com/185/000000/FFFFFF/?text=NO-IMAGE" :
                thePosterUrl = URL_IMG + movie.poster_path;

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
            searchResultDisplay.innerHTML += temp;
        }
    } catch (err) { console.log(err) }
    getModalData()
}

/*--------------------------------------------------------*/
const genreBtns = document.querySelectorAll('.genre-btn')
for (let genreBtn of genreBtns) { 
    genreBtn.addEventListener('click', (e) => {
        let genreId = e.target.dataset.genre;
        getMoviesForGenre(genreId)
    })
 }