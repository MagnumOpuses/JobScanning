import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_FAILURE,
  JOBS_ADD_MORE,
  JOB_SELECT,
  JOB_UNSELECT
} from '../actions'
import _ from 'lodash'
import createScoreboard from '../../utils/createScoreboard'

const initialState = {
  searchTerm: '',
  location: '',
  offset: 0,
  isFetching: false,
  hits: [],
  processedList: [],
  markers: [],
  selectedJob: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        searchTerm: action.term,
        location: action.location,
        selectedJob: {}
      }
    }

    case JOBS_SUCCESS: {
      const scoreboard = createScoreboard(action.payload.hits)

      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload,
        scoreboard
      }
    }

    case JOBS_FAILURE: {
      return { ...state, isFetching: false, error: true }
    }

    case JOBS_ADD_MORE: {
      const hits = [...state.hits, ...action.payload.hits]
      const processedList = [
        ...state.processedList,
        ...action.payload.processedList
      ]
      let markers = _.uniqBy(
        [...state.markers, ...action.payload.markers],
        'id'
      )
      const scoreboard = createScoreboard(hits)

      return {
        ...state,
        hits,
        processedList,
        markers,
        scoreboard
      }
    }

    case JOB_SELECT: {
      return {
        ...state,
        selectedJob: action.job
      }
    }

    case JOB_UNSELECT: {
      return {
        ...state,
        selectedJob: {}
      }
    }

    default:
      return state
  }
}
