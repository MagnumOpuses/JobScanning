import { countiesAndMunicipalities } from './searchOptions'

export default function getNumberOfJobsInPlace(jobs) {
  const numberOfJobsInPlace = {}

  jobs.forEach(job => {
    if (job.location) {
      countiesAndMunicipalities.forEach(place => {
        if (job.location === place.text) {
          if (place.county in numberOfJobsInPlace) {
            numberOfJobsInPlace[place.county] += 1
          } else {
            numberOfJobsInPlace[place.county] = 1
          }

          if (place.text in numberOfJobsInPlace) {
            numberOfJobsInPlace[place.text] += 1
          } else {
            numberOfJobsInPlace[place.text] = 1
          }
        }
      })
    }
  })

  console.log(numberOfJobsInPlace)

  return numberOfJobsInPlace
}
