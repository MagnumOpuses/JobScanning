import axios from 'axios'

export default async address => {
  try {
    let geocode = await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
          process.env.REACT_APP_DEV_GOOGLE_MAPS_API_KEY
        }`
      )
      .then(response => response.data.results[0])
    return geocode
  } catch (error) {
    console.log('MyFancyComponent -> }catch -> error', error)
  }
}
