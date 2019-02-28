const createScoreboard = jobs => {
  const scoreboard = {}

  jobs.forEach(job => {
    job.sources.forEach(source => {
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

  const sortedScoreboard = []
  ordered.forEach(source => {
    sortedScoreboard.push({ source: source, score: scoreboard[source] })
  })

  return sortedScoreboard
}

export default createScoreboard
