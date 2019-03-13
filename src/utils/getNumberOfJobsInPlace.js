import { countiesAndMunicipalities } from './searchOptions'

export default function getNumberOfJobsInPlace(jobs) {
  const numberOfJobsInCounties = {}

  jobs.forEach(job => {
    if (job.location) {
      countiesAndMunicipalities.forEach(place => {
        if (job.location === place.text) {
          if (place.county in numberOfJobsInCounties) {
            numberOfJobsInCounties[place.county].count += 1
          } else {
            numberOfJobsInCounties[place.county] = { count: 1 }
          }

          if (place.text in numberOfJobsInCounties[place.county]) {
            numberOfJobsInCounties[place.county][place.text] += 1
          } else {
            numberOfJobsInCounties[place.county][place.text] = 1
          }
        }
      })
    }
  })

  return numberOfJobsInCounties
}
