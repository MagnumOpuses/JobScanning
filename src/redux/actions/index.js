import fetchJobs from '../../api/fetchJobs'
import processJobList from '../../utils/processJobList'
// import mockData from '../../mocks/utvecklareResponse.json'

export const SEARCH_TERM = 'SEARCH_TERM'
export const JOBS_REQUEST = 'JOBS_REQUEST'
export const JOBS_SUCCESS = 'JOBS_SUCCESS'
export const JOBS_FAILURE = 'JOBS_FAILURE'
export const JOBS_ADD_MORE = 'JOBS_ADD_MORE'
export const SET_LOCATION = 'SET_LOCATION'
export const JOB_SELECT = 'JOB_SELECT'
export const JOB_UNSELECT = 'JOB_UNSELECT'

export const searchJobs = (term, location) => async dispatch => {
  // Dispatch that sets loading state to true
  dispatch({
    type: JOBS_REQUEST,
    term,
    location
  })

  let { data } = await fetchJobs(term, location)
  // let data = mockData
  const processedList = processJobList(data.hits)

  data = { ...data, processedList }

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
  let { data } = await fetchJobs(term, location, offset)

  const processedList = processJobList(data.hits)

  data = { hits: data.hits, processedList }

  if (data.hits.length > 0) {
    dispatch({
      type: JOBS_ADD_MORE,
      payload: data
    })
  }
}

export const setLocation = location => {
  return {
    type: SET_LOCATION,
    location
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
