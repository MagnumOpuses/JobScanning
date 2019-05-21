import {
  JOBS_REQUEST,
  JOBS_SUCCESS,
  JOBS_FAILURE,
  JOBS_ADD_MORE,
  JOBS_NO_MORE,
  SET_SEARCH_TERM,
  SET_LOCATION,
  JOB_SELECT,
  JOB_UNSELECT
} from '../actions';
import _ from 'lodash';
import createScoreboard from '../../utils/createScoreboard';
import getNumberOfJobsInPlace from '../../utils/getNumberOfJobsInPlace';
import countAndSort from '../../utils/countAndSort';

const initialState = {
  searchTerm: '',
  location: '',
  isFetching: false,
  hits: [],
  hasMore: true,
  processedList: [],
  selectedJob: {},
  numberOfJobsInPlace: {},
  offset: 0,
  total: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case JOBS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        hasMore: true,
        searchTerm: action.term,
        location: action.location,
        selectedJob: {}
      };
    }

    case JOBS_SUCCESS: {
      console.log(action);

      const scoreboard = createScoreboard(action.payload.hits);
      const numberOfJobsInPlace = getNumberOfJobsInPlace(action.payload.hits);

      const topCompetences = countAndSort(action.payload.hits, 'skills');
      const topTraits = countAndSort(action.payload.hits, 'traits');

      return {
        ...state,
        isFetching: false,
        error: false,
        ...action.payload,
        scoreboard,
        numberOfJobsInPlace,
        topCompetences,
        topTraits,
        offset: action.offset,
        selectedJob: action.payload.processedList[0].changedLocation
          ? {}
          : action.payload.processedList[0]
      };
    }

    case JOBS_FAILURE: {
      return { ...state, isFetching: false, error: true };
    }

    case JOBS_ADD_MORE: {
      const hits = [...state.hits, ...action.payload.hits];
      let processedList = [
        ...state.processedList,
        ...action.payload.processedList
      ];

      processedList = _.uniqBy(processedList, 'id');
      const scoreboard = createScoreboard(hits);
      const numberOfJobsInPlace = getNumberOfJobsInPlace(processedList);

      const topCompetences = countAndSort(hits, 'skills');
      const topTraits = countAndSort(hits, 'traits');

      return {
        ...state,
        hits,
        processedList,
        scoreboard,
        numberOfJobsInPlace,
        topCompetences,
        topTraits,
        total: action.payload.total,
        offset: action.offset
      };
    }

    case JOBS_NO_MORE: {
      return {
        ...state,
        hasMore: false
      };
    }

    case SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    }

    case SET_LOCATION: {
      // const jobsInSelectedLocation = _.remove(
      //   state.processedList,
      //   job => job.location === action.location
      // )

      // state.processedList.unshift(...jobsInSelectedLocation)

      return {
        ...state,
        location: action.locationObject
      };
    }

    case JOB_SELECT: {
      return {
        ...state,
        selectedJob: action.job
      };
    }

    case JOB_UNSELECT: {
      return {
        ...state,
        selectedJob: {}
      };
    }

    default:
      return state;
  }
};
