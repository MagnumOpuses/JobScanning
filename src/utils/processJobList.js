import _ from 'lodash'

export default ({ list, offset }) => {
  const jobsWithOffset = addOffset(list, offset)
  // const removedPassedDeadlines = removePassedDeadlines(list)

  return jobsWithOffset
}

// const removePassedDeadlines = list => {
//   const dateNow = Date.now()
//   return _.filter(list, item => {
//     return Date.parse(item.application.deadline) > dateNow
//   })
// }

const addOffset = (list, offset) => {
  return list.map(job => {
    return { ...job, offset: offset }
  })
}
