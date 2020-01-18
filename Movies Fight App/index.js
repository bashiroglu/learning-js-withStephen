const FetchSearchResult = async searchedKeyword => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '41e8565e',
      s: searchedKeyword
    }
  });
  console.log(response.data);
};

const input = document.querySelector('input');

let timeOutId;
const onInput = event => {
  if (timeOutId) { 
    clearTimeout(timeOutId);
  }
  timeOutId = setTimeout(() => {
    FetchSearchResult(event.target.value);
  }, 500);
};

input.addEventListener('input', onInput);
