import apiFetchJobs from '../../api/fetchJobs'
import processJobList from '../../utils/processJobList'
import mockData from '../../mocks/ekonomiassistentResponse.json'

export const JOBS_REQUEST = 'JOBS_REQUEST'
export const JOBS_SUCCESS = 'JOBS_SUCCESS'
export const JOBS_FAILURE = 'JOBS_FAILURE'
export const JOBS_ADD_MORE = 'JOBS_ADD_MORE'
export const JOBS_NO_MORE = 'JOBS_NO_MORE'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_LOCATION = 'SET_LOCATION'
export const JOB_SELECT = 'JOB_SELECT'
export const JOB_UNSELECT = 'JOB_UNSELECT'

export const fetchJobs = (term, location) => async dispatch => {
  // Dispatch that sets loading state to true
  dispatch({
    type: JOBS_REQUEST,
    term,
    location
  })

  try {
    let res
    let data = mockData
    res = { data: data }
    // const res = await apiFetchJobs(term, location)
    const processedList = processJobList({ list: res.data.hits, offset: 0 })
    res.data = { ...res.data, processedList }

    if (!res.data.hits.length > 0) {
      dispatch({
        type: JOBS_FAILURE
      })
    }

    dispatch({
      type: JOBS_SUCCESS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: JOBS_FAILURE
    })
  }
}

export const fetchMoreJobs = (term, location, offset) => async dispatch => {
  try {
    const res = await apiFetchJobs(term, location, offset)
    const processedList = processJobList({ list: res.data.hits, offset })
    res.data = { hits: res.data.hits, processedList }

    if (!res.data.hits.length > 0) {
      dispatch({
        type: JOBS_NO_MORE
      })
    }

    dispatch({
      type: JOBS_ADD_MORE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: JOBS_FAILURE
    })
  }
}

export const setSearchTerm = searchTerm => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
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
