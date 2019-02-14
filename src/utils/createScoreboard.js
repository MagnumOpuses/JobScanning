const createScoreboard = hits => {
  // let scoreboard = hits.reduce((allSources, job) => {
  //   if (job.sources.name in allSources) {
  //     allSources[job.sources.name]++
  //   } else {
  //     allSources[job.sources.name] = 1
  //   }
  //   return allSources
  // }, {})

  const scoreboard = {}

  hits.forEach(obj => {
    obj.sources.forEach(source => {
      if (source.name in scoreboard) {
        scoreboard[source.name]++
      } else {
        scoreboard[source.name] = 1
      }
    })
  })

  let ordered = Object.keys(scoreboard).sort(
    (a, b) => scoreboard[b] - scoreboard[a]
  )
  ordered = ordered.length > 10 ? ordered.slice(0, 10) : ordered

  let sortedScoreboard = []
  ordered.forEach(source => {
    sortedScoreboard.push([source, scoreboard[source]])
  })

  let test = []

  sortedScoreboard.forEach(element => {
    test = [...test, { source: element[0], score: element[1] }]
  })

  return test
}

export default createScoreboard
