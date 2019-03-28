import { countiesAndMunicipalities } from './searchOptions'

export default function getNumberOfJobsInPlace(jobs) {
  const numberOfJobsInPlace = { sweden: 0 }

  jobs.forEach(job => {
    if (job.location) {
      numberOfJobsInPlace.sweden += 1
      countiesAndMunicipalities.forEach(place => {
        if (job.location === place.text) {
          // Om kommunnamnet (kort) finns i listan
          if (place.text in numberOfJobsInPlace) {
            // Plussa på kommunen
            numberOfJobsInPlace[place.text] += 1
          } else {
            // Sätt kommunen till 1
            numberOfJobsInPlace[place.text] = 1
          }

          if (place.county) {
            // Om länet finns i objektet
            if (place.county in numberOfJobsInPlace) {
              // Plussa på länet
              numberOfJobsInPlace[place.county] += 1
            } else {
              // Sätt länet till 1
              numberOfJobsInPlace[place.county] = 1
            }
          }
        }
      })
    }
  })

  console.log(numberOfJobsInPlace)

  return numberOfJobsInPlace
}
