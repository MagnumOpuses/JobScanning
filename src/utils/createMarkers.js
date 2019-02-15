import fetchLocation from '../api/fetchLocation'

export default async list => {
  let removedUnkownLocation = list.filter(item => item.location)
  const groupedByLocation = groupByLocation(removedUnkownLocation)

  let markers = []
  for (const city in groupedByLocation) {
    try {
      let geocode = await fetchLocation(city)
      let steps = (1 / 360) * 100
      let latRadius = 0.0005
      let lngRadius = 0.001

      // eslint-disable-next-line
      groupedByLocation[city].forEach((obj, i) => {
        const centerLat = geocode.geometry.location.lat
        const centerLng = geocode.geometry.location.lng

        let newLat = centerLat
        let newLng = centerLng

        newLat -= Math.sin(i * steps) * latRadius
        newLng -= Math.cos(i * steps) * lngRadius

        if (i < 5) {
          latRadius += 0.0005
          lngRadius += 0.001
        } else {
          latRadius += 0.00005
          lngRadius += 0.0001
        }

        obj.geocode = {
          geometry: { location: { lat: newLat, lng: newLng } }
        }

        if (i === 0) {
          obj.geocode = {
            geometry: { location: { lat: centerLat, lng: centerLng } }
          }
        }

        if (geocode) {
          markers = [...markers, obj]
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return markers
}

const groupByLocation = list => {
  const groupedByLocation = list.reduce((acc, obj) => {
    const city = obj.location
    if (!acc[city]) {
      acc[city] = []
    }
    acc[city].push(obj)
    return acc
  }, {})
  return groupedByLocation
}
