export default list => {
  const allSources = [];

  list.forEach(obj => {
    if (obj.sources) {
      obj.sources.forEach(source => {
        allSources.push(source.name);
      });
    }
  });

  const uniqueSources = [...new Set(allSources)].length;
  const number = uniqueSources < 10 ? uniqueSources : 10;

  return number;
};
