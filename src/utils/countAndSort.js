export default function countAndSort(jobs, target) {
  const scoreboard = {}

  jobs.forEach(job => {
    if (job.detected_keywords) {
      job.detected_keywords[target].forEach(word => {
        if (word in scoreboard) {
          scoreboard[word]++
        } else {
          scoreboard[word] = 1
        }
      })
    }
  })

  let ordered = Object.keys(scoreboard).sort(
    (a, b) => scoreboard[b] - scoreboard[a]
  )
  ordered = ordered.length > 10 ? ordered.slice(0, 10) : ordered

  const sortedScoreboard = []
  ordered.forEach(word => {
    sortedScoreboard.push({ keyword: word, score: scoreboard[word] })
  })

  return sortedScoreboard
}
