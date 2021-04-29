/************************************************************
                Search Movies Information
*************************************************************/
const searchForm = document.querySelector('#theForm');
const keywords = document.querySelector('#keywords');

let searchQuery = "";
const URL_SEARCH = `${URL_BASE}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`;

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let cleanQuery = "";
    keywords.value !== "" ?  cleanQuery = keywords.value : alert('Please enter your keyword')
    searchQuery = cleanQuery.trim();
    console.log(searchQuery)
})

const search = async (query) => {
    query && console.log(query)
}

search(searchQuery);