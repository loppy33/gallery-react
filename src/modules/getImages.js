const API_KEY = "vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH";

async function getImages(PER_PAGE, searchInput, setSearchInput, favoriteId) {
  try {
    const newPage = Math.floor(Math.random() * 999) + 1;
    const page = searchInput.query.length === 0 ? newPage : searchInput.page + 1;

    const url = generateImageUrl(PER_PAGE, page, searchInput.query, favoriteId);

    const response = await fetch(url, {
      headers: {
        'Authorization': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    if (searchInput.query.length !== 0 && data.photos.length === 0) {
      // Обработка ситуации, когда нет результатов поиска на следующей странице
      // Можно добавить соответствующую обработку или обновить состояние
    }

    if (setSearchInput) {
      setSearchInput(prevSearchInput => ({ ...prevSearchInput, page }));
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function generateImageUrl(PER_PAGE, page, query, favoriteId) {
  const baseUrl = query.length === 0 ? 'https://api.pexels.com/v1/curated' : 'https://api.pexels.com/v1/search';
  const url = new URL(baseUrl);
  url.searchParams.append('per_page', PER_PAGE);
  url.searchParams.append('page', page);
  // url.searchParams.append('orientation', 'square');
  // url.searchParams.append('color', 'black');
  if (favoriteId) {
    url.searchParams.append('photos', favoriteId)
  }
  if (query.length > 0) {
    url.searchParams.append('query', query);
  }
  return url.toString();
}

export default getImages;