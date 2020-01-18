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
