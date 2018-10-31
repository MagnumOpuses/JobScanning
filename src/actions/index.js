import getJobList from '../api/getJobList'
import processJobList from '../utils/processJobList'

export const SEARCH_TERM = 'SEARCH_TERM'
export const SEARCH_LOCATION = 'SEARCH_LOCATION'
export const ADS_REQUEST = 'ADS_REQUEST'
export const ADS_SUCCESS = 'ADS_SUCCESS'
export const ADS_FAILURE = 'ADS_FAILURE'

export const searchAds = (term, location) => async dispatch => {
  console.log('searchAds Action: term and location.', term, location)

  // dispatch that sets loading to true
  dispatch({
    type: ADS_REQUEST
  })

  const locationType = location.length > 2 ? 'kommun' : 'lan'
  console.log(locationType)

  let { data } = await getJobList(term, locationType, location)

  const allSources = data.hits.map(item => item.source.site.name)
  const uniqueSources = [...new Set(allSources)].length

  const processedList = processJobList(data.hits)

  data = { ...data, uniqueSources, processedList }

  dispatch({
    type: SEARCH_TERM,
    payload: term
  })

  dispatch({
    type: SEARCH_LOCATION,
    payload: location
  })

  if (data.hits.length > 0) {
    dispatch({
      type: ADS_SUCCESS,
      payload: data
    })
  }

  if (!data.hits.length > 0) {
    dispatch({
      type: ADS_FAILURE
    })
  }
}
