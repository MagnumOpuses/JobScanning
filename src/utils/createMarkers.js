import fetchLocation from '../api/fetchLocation'

export default async list => {
  let removedUnkownLocation = list.filter(item => item.location)
  const groupedByLocation = groupByLocation(removedUnkownLocation)

  let markers = []
  for (const city in groupedByLocation) {
    try {
      let geocode = await fetchLocation(city)
      let radius = 0.001
      let steps = (1 / 360) * 100

      groupedByLocation[city].forEach((obj, index) => {
        const centerLat = geocode.geometry.location.lat
        const centerLng = geocode.geometry.location.lng

        let newLat = centerLat
        let newLng = centerLng

        newLat -= Math.sin(index * steps) * radius
        newLng -= Math.cos(index * steps) * radius

        radius += 0.0001

        obj.geocode = {
          geometry: { location: { lat: newLat, lng: newLng } }
        }

        if (index === 0) {
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
    const city = obj.location.translations['sv-SE']
    if (!acc[city]) {
      acc[city] = []
    }
    acc[city].push(obj)
    return acc
  }, {})
  return groupedByLocation
}
