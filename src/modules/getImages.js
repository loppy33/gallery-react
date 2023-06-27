const API_KEY = "vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH";

async function getImages(PER_PAGE, searchInput, setSearchInput) {
    let url;
    const newPage = Math.floor(Math.random() * 999) + 1;
    if (searchInput.query.length === 0) {
      url = `https://api.pexels.com/v1/curated?per_page=${PER_PAGE}&page=${newPage}`;
    } else {
      url = `https://api.pexels.com/v1/search?query=${searchInput.query}&per_page=${PER_PAGE}&page=${searchInput.page + 1}`;
      setSearchInput(prevSearchInput => ({ ...prevSearchInput, page: prevSearchInput.page + 1 }));
    }
    const response = await fetch(url, {
      headers: {
        'Authorization': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    
    return await response.json();
}


export default getImages;