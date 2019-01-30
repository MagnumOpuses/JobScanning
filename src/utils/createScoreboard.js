const createScoreboard = hits => {
  // let scoreboard = hits.reduce((acc, val) => {
  //   acc[val.source.site.name] = acc[val.source.site.name]
  //     ? acc[val.source.site.name] + 1
  //     : 1
  //   return acc
  // }, {})

  // let ordered = Object.keys(scoreboard).sort(
  //   (a, b) => scoreboard[b] - scoreboard[a]
  // )
  // ordered = ordered.length > 10 ? ordered.slice(0, 10) : ordered

  // let sortedScoreboard = []

  // ordered.forEach(source => {
  //   sortedScoreboard.push(scoreboard[source])
  // })

  let scoreboard = hits.reduce((allSources, job) => {
    if (job.source.site.name in allSources) {
      allSources[job.source.site.name]++
    } else {
      allSources[job.source.site.name] = 1
    }
    return allSources
  }, {})

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
