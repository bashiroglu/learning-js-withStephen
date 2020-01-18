const FetchSearchResult = async searchedKeyword => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '41e8565e',
      s: searchedKeyword
    }
  });

  if (response.data.Error) {
    return [];
  }

  return response.data.Search;
};

const input = document.querySelector('input');

const onInput = async event => {
  const movies = await FetchSearchResult(event.target.value);
  for (let movie of movies) {
    const div = document.createElement('div');

    div.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}">
      <h1>${movie.Title}</h1>
    `;

    const id = document.getElementById('target');
    id.appendChild(div);
  }
};

input.addEventListener('input', debounce(onInput, 500));
