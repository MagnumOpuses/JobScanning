import fetchJobs from '../../api/fetchJobs'
import processJobList from '../../utils/processJobList'
import createMarkers from '../../utils/createMarkers'
import store from '../store/index'

export const SEARCH_TERM = 'SEARCH_TERM'
export const JOBS_REQUEST = 'JOBS_REQUEST'
export const JOBS_SUCCESS = 'JOBS_SUCCESS'
export const JOBS_FAILURE = 'JOBS_FAILURE'
export const JOBS_ADD_MORE = 'JOBS_ADD_MORE'
export const JOB_SELECT = 'JOB_SELECT'
export const JOB_UNSELECT = 'JOB_UNSELECT'

export const searchJobs = (term, location) => async dispatch => {
  // Dispatch that sets loading state to true
  dispatch({
    type: JOBS_REQUEST,
    term,
    location
  })

  //const locationType = location.length > 2 ? 'kommun' : 'lan'
  let { data } = await fetchJobs(term)

  const processedList = processJobList(data.hits)

  const markers = await createMarkers(processedList)

  data = { ...data, processedList, markers }

  if (data.hits.length > 0) {
    dispatch({
      type: JOBS_SUCCESS,
      payload: data
    })
  }

  if (!data.hits.length > 0) {
    dispatch({
      type: JOBS_FAILURE
    })
  }
}

export const fetchMoreJobs = (term, location, offset) => async dispatch => {
  const locationType = location.length > 2 ? 'kommun' : 'lan'
  let { data } = await fetchJobs(term, locationType, location, offset)

  const processedList = processJobList(data.hits)

  // const markers = await createMarkers(processedList)

  const storeProcessedList = store.getState().ads.processedList
  const markers = await createMarkers([...processedList, ...storeProcessedList])

  data = { hits: data.hits, processedList, markers }

  if (data.hits.length > 0) {
    dispatch({
      type: JOBS_ADD_MORE,
      payload: data
    })
  }
}

export const selectJob = job => {
  return {
    type: JOB_SELECT,
    job
  }
}

export const unselectJob = () => {
  return {
    type: JOB_UNSELECT
  }
}
