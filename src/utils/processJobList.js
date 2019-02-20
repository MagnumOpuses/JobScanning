import _ from 'lodash'

export default list => {
  const removedPassedDeadlines = removePassedDeadlines(list)

  return list
}

const removePassedDeadlines = list => {
  const dateNow = Date.now()
  let deadlinesInFuture = _.filter(list, item => {
    return (
      Date.parse(item.application.deadline) > dateNow ||
      item.application.deadline === null
    )
  })
  return deadlinesInFuture
}
