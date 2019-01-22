export default list => {
  const allSources = list.map(item => item.source.site.name)
  const uniqueSources = [...new Set(allSources)].length
  const number = uniqueSources < 10 ? uniqueSources : 10

  return number
}
