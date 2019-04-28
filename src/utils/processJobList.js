export default ({ list, offset }) => {
  const jobsWithOffset = addOffset(list, offset)
  // const removedPassedDeadlines = removePassedDeadlines(list)

  return jobsWithOffset
}

const addOffset = (list, offset) => {
  return list.map(job => {
    return { ...job, offset: offset }
  })
}
