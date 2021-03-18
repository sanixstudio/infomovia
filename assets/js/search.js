/************************************************************
                Search Movies Information
*************************************************************/

const searchForm = document.querySelector('#theForm');
const keywords = document.querySelector('#keywords');

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