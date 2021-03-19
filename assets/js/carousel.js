const getGenre = (id) => {
    switch(id) {
        case 12:    
            return "Adventure"
        case 14:    
            return "Fantasy" 
        case 16:    
            return "Animation" 
        case 18:    
            return "Drama" 
        case 27:    
            return "Horror" 
        case 28:    
            return "Action" 
        case 35:    
            return "Comedy" 
        case 36:    
            return "History" 
        case 37:    
            return "Western" 
        case 53:    
            return "Thriller" 
        case 80:    
            return "Crime" 
        case 99:    
            return "Documentary" 
        case 878:   
            return "Science Fiction"
        case 9648:  
            return "Mystery"
        case 10402:     
            return "Music"
        case 10749:     
            return "Romance"
        case 10751:     
            return "Family"
        case 10752:     
            return "War"
        case 10770: 
            return "TV Movie"
        default: 
            return "Sorry"
    }
}

// Hero Carousel
const getMoviesForCarousel = async() => {
    const hero = document.querySelector('.hero');
    const bgDynamic = document.querySelector('.bgDynamic');
    
    let currentCarouselItem = 0;

    // get movies data from Api, make template with data and push to carouselItems array 
    let res = await (await fetch(URL_UPCOMING)).json();
    res.results.map((movie, i) => {
        const poster = URL_POSTER + movie.backdrop_path;
        const { title, popularity, genre_ids, overview } = movie;

        bgDynamic.style.background = `url(${URL_POSTER})`
        const heroHTML = `<figure>
                            <img src=${poster} data-bg=${poster} alt="">
                            <figcaption>
                                <h2 class="movie-title">${title}</h2>
                                <div class="info">
                                    <span class="rating"><i class="fas fa-star"></i>${popularity}</span>
                                    <span class="genre-sec">
                                    ${genre_ids.map(id => { 
                                        return `<span>${getGenre(id)}</span>`
                                    })}
                                    </span>
                                </div>
                                <p>
                                    ${overview}
                                </p>
                            </figcaption>
                        </figure>`
        hero.innerHTML += heroHTML
    });

    const figures = Array.prototype.slice.call(document.querySelectorAll('figure'))
    console.log(figures)
    
    figures.forEach(figure => figure.classList.add('hide'))
    figures[currentCarouselItem].classList.remove('hide')
    
    setInterval(() => {
        if (currentCarouselItem < figures.length){
            figures[currentCarouselItem].classList.remove('hide')
            currentCarouselItem += 1;
            
        }else {
            currentCarouselItem = 0;
            figures.forEach(figure => figure.classList.add('hide'))
            figures[currentCarouselItem].classList.remove('hide')
        }
    }, 5000);
}

getMoviesForCarousel();