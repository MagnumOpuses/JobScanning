import axios from 'axios'

export default async (queryString, offset) => {
  try {
    return await axios({
      method: 'get',
      baseURL: process.env.REACT_APP_DEV_API_URL,
      url: '/search',
      headers: { 'api-key': process.env.REACT_APP_DEV_API_KEY },
      params: {
        offset: offset,
        limit: 20,
        q: queryString
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
