export default list => {
  // const allSources = list.map(item => item.sources.name)
  const allSources = []

  list.forEach(obj => {
    obj.sources.forEach(source => {
      allSources.push(source.name)
    })
  })
  // const allSources = list.map((obj, i) => obj.sources[i].name)
  const uniqueSources = [...new Set(allSources)].length
  const number = uniqueSources < 10 ? uniqueSources : 10

  return number
}
