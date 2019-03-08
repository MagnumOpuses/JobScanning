import axios from 'axios'

export default async (q, place, offset) => {
  try {
    return await axios({
      method: 'get',
      baseURL: process.env.REACT_APP_DEV_API_URL,
      url: '/search',
      // headers: { 'api-key': process.env.REACT_APP_DEV_API_KEY },
      params: {
        q,
        place,
        offset,
        limit: 20
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
