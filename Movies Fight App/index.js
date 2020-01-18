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

const debounce = (funct, delayTime = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      funct.apply(null, args);
    }, delayTime);
  };
};

const onInput = event => {
  FetchSearchResult(event.target.value);
};

input.addEventListener('input', debounce(onInput, 500));
