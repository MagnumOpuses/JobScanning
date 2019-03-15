import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_FAILURE,
  JOBS_ADD_MORE,
  SET_LOCATION,
  JOB_SELECT,
  JOB_UNSELECT
} from '../actions'
import _ from 'lodash'
import createScoreboard from '../../utils/createScoreboard'
import getNumberOfJobsInPlace from '../../utils/getNumberOfJobsInPlace'
import countAndSort from '../../utils/countAndSort'

const initialState = {
  searchTerm: '',
  location: '',
  offset: 0,
  isFetching: false,
  hits: [],
  processedList: [],
  selectedJob: {},
  numberOfJobsInPlace: {}
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
      const numberOfJobsInPlace = getNumberOfJobsInPlace(action.payload.hits)

      const topCompetences = countAndSort(action.payload.hits, 'skills')
      const topTraits = countAndSort(action.payload.hits, 'traits')

      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload,
        scoreboard,
        numberOfJobsInPlace,
        topCompetences,
        topTraits
      }
    }

    case JOBS_FAILURE: {
      return { ...state, isFetching: false, error: true }
    }

    case JOBS_ADD_MORE: {
      const hits = [...state.hits, ...action.payload.hits]
      let processedList = [
        ...state.processedList,
        ...action.payload.processedList
      ]

      processedList = _.uniqBy(processedList, 'id')
      const scoreboard = createScoreboard(hits)
      const numberOfJobsInPlace = getNumberOfJobsInPlace(hits)

      const topCompetences = countAndSort(hits, 'skills')
      const topTraits = countAndSort(hits, 'traits')

      return {
        ...state,
        hits,
        processedList,
        scoreboard,
        numberOfJobsInPlace,
        topCompetences,
        topTraits
      }
    }

    case SET_LOCATION: {
      return {
        ...state,
        location: action.location
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
