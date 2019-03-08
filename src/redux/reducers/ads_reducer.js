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
import { countiesAndMunicipalities } from '../../utils/searchOptions'

const initialState = {
  searchTerm: '',
  location: '',
  offset: 0,
  isFetching: false,
  hits: [],
  processedList: [],
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

function countAndSort(jobs, target) {
  const scoreboard = {}

  jobs.forEach(job => {
    job.detected_keywords[target].forEach(word => {
      if (word in scoreboard) {
        scoreboard[word]++
      } else {
        scoreboard[word] = 1
      }
    })
  })

  let ordered = Object.keys(scoreboard).sort(
    (a, b) => scoreboard[b] - scoreboard[a]
  )
  ordered = ordered.length > 10 ? ordered.slice(0, 10) : ordered

  const sortedScoreboard = []
  ordered.forEach(word => {
    sortedScoreboard.push({ keyword: word, score: scoreboard[word] })
  })

  return sortedScoreboard
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
      const numberOfJobsInCounties = getNumberOfJobsInCounties(
        action.payload.hits
      )

      const topCompetences = countAndSort(action.payload.hits, 'skills')
      const topTraits = countAndSort(action.payload.hits, 'traits')

      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload,
        scoreboard,
        numberOfJobsInCounties,
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
      const numberOfJobsInCounties = getNumberOfJobsInCounties(hits)

      const topCompetences = countAndSort(hits, 'skills')
      const topTraits = countAndSort(hits, 'traits')

      return {
        ...state,
        hits,
        processedList,
        scoreboard,
        numberOfJobsInCounties,
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
