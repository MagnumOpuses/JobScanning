import _ from 'lodash'

export default list => {
  const removedPassedDeadlines = removePassedDeadlines(list)

  return removedPassedDeadlines
}

const removePassedDeadlines = list => {
  const dateNow = Date.now()
  return _.filter(list, item => {
    return (
      Date.parse(item.application.deadline) > dateNow ||
      item.application.deadline === null
    )
  })
}
