import apiFetchJobs from '../../api/fetchJobs'
import processJobList from '../../utils/processJobList'
import { countiesAndMunicipalities } from '../../utils/searchOptions'

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
  dispatch({
    type: JOBS_REQUEST,
    term,
    location
  })

  try {
    const res = await apiFetchJobs(term, location.value)

    if (!res.data.hits.length > 0) {
      dispatch({
        type: JOBS_FAILURE
      })
    }

    const processedList = processJobList({ list: res.data.hits })
    res.data = { ...res.data, processedList }

    dispatch({
      type: JOBS_SUCCESS,
      payload: res.data,
      offset: 0
    })
  } catch (error) {
    dispatch({
      type: JOBS_FAILURE
    })
  }
}

export const fetchMoreJobs = (term, location, offset) => async dispatch => {
  try {
    const res = await apiFetchJobs(term, location.value, offset)

    if (
      (!res.data.hits.length > 0 && location.type === 'municipality') ||
      location.type === 'county'
    ) {
      offset = 0
      if (location.type === 'municipality') {
        const locationObject = countiesAndMunicipalities.find(
          place => place.value === location.county
        )

        dispatch({
          type: SET_LOCATION,
          locationObject
        })

        const res = await apiFetchJobs(term, location.county, offset)

        if (!res.data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          })
        }
        const processedList = processJobList({ list: res.data.hits, offset })
        processedList.unshift({ newLocation: true })
        res.data = { ...res.data, processedList }

        dispatch({
          type: JOBS_ADD_MORE,
          payload: res.data,
          offset
        })
      } else if (location.type === 'county') {
        dispatch({
          type: SET_LOCATION,
          locationObject: { key: 'everywhere', text: 'Hela Sverige', value: '' }
        })

        const res = await apiFetchJobs(term, '', offset)

        if (!res.data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          })
        }
        const processedList = processJobList({ list: res.data.hits, offset })
        processedList.unshift({ newLocation: true })
        res.data = { ...res.data, processedList }

        dispatch({
          type: JOBS_ADD_MORE,
          payload: res.data,
          offset
        })
      }
    } else if (!res.data.hits.length > 0) {
      dispatch({
        type: JOBS_NO_MORE
      })
    }

    const processedList = processJobList({ list: res.data.hits, offset })
    res.data = { ...res.data, processedList }

    dispatch({
      type: JOBS_ADD_MORE,
      payload: res.data,
      offset
    })
  } catch (error) {
    console.log(error)

    // dispatch({
    //   type: JOBS_FAILURE
    // })
  }
}

export const setSearchTerm = searchTerm => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}

export const setLocation = location => {
  const locationObject = countiesAndMunicipalities.find(
    place => place.value === location
  )

  return {
    type: SET_LOCATION,
    locationObject
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
