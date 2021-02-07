export const movieSortingABC = (array) => {
  const outputList = array.sort(function (a, b) {
    if (a.movie.title < b.movie.title) {
      return -1;
    }
  });
  return outputList;
};
