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
import { countiesAndMunicipalities } from '../../utils/searchOptions'

const initialState = {
  searchTerm: '',
  location: '',
  offset: 0,
  isFetching: false,
  hits: [],
  processedList: [],
  markers: [],
  selectedJob: {},
  numberOfJobsInCounties: {}
}

function getNumberOfJobsInCounties(jobs) {
  const numberOfJobsInCounties = {
    'Blekinge län': 0,
    'Dalarnas län': 0,
    'Gotlands län': 0,
    'Gävleborgs län': 0,
    'Hallands län': 0,
    'Jämtlands län': 0,
    'Jönköpings län': 0,
    'Kalmar län': 0,
    'Kronobergs län': 0,
    'Norrbottens län': 0,
    'Skåne län': 0,
    'Stockholms län': 0,
    'Södermanlands län': 0,
    'Uppsala län': 0,
    'Värmlands län': 0,
    'Västerbottens län': 0,
    'Västernorrlands län': 0,
    'Västmanlands län': 0,
    'Västra Götalands län': 0,
    'Örebro län': 0,
    'Östergötlands län': 0
  }

  jobs.forEach(job => {
    if (job.location) {
      countiesAndMunicipalities.forEach(item => {
        if (job.location === item.text) {
          numberOfJobsInCounties[item.county] += 1
        }
      })
    }
  })

  return numberOfJobsInCounties
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
      const scoreboard = createScoreboard(action.payload.processedList)
      const numberOfJobsInCounties = getNumberOfJobsInCounties(
        action.payload.hits
      )

      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload,
        scoreboard,
        numberOfJobsInCounties
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
      // let markers = _.uniqBy(
      //   [...state.markers, ...action.payload.markers],
      //   'id'
      // )
      const scoreboard = createScoreboard(processedList)
      const numberOfJobsInCounties = getNumberOfJobsInCounties(hits)

      return {
        ...state,
        hits,
        processedList,
        // markers,
        scoreboard,
        numberOfJobsInCounties
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
