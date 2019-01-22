import _ from 'lodash'

export default list => {
  const removedPassedDeadlines = removePassedDeadlines(list)
  const removedDuplicates = removeDuplicates(removedPassedDeadlines)

  return removedDuplicates
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

const removeDuplicates = list => {
  return _.uniqBy(list, 'group.id')
}
