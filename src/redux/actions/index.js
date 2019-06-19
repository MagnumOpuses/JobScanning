import apiFetchJobs from '../../api/fetchJobs';
import { countiesAndMunicipalities } from '../../utils/searchOptions';

export const JOBS_REQUEST = 'JOBS_REQUEST';
export const JOBS_SUCCESS = 'JOBS_SUCCESS';
export const JOBS_FAILURE = 'JOBS_FAILURE';
export const JOBS_ADD_MORE = 'JOBS_ADD_MORE';
export const JOBS_NO_MORE = 'JOBS_NO_MORE';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_LOCATION = 'SET_LOCATION';
export const JOB_SELECT = 'JOB_SELECT';
export const JOB_UNSELECT = 'JOB_UNSELECT';

export const fetchJobs = (term, location) => async dispatch => {
  // dispatch loading state for indicators
  dispatch({
    type: JOBS_REQUEST
  });

  try {
    // fetch jobs
    let { data } = await apiFetchJobs(term, location.value);

    // if no jobs in response, dispatch failure
    if (!data.hits.length > 0) {
      dispatch({
        type: JOBS_FAILURE
      });
    }

    // if jobs in response, add used search term and location to response
    data = {
      ...data,
      usedSearchTerm: term,
      usedLocation: location
    };

    // dispatch the response and set request to OK, also set offset back to 0.
    dispatch({
      type: JOBS_SUCCESS,
      payload: data,
      offset: 0
    });

    // if the jobs were less than 20, also fetch municipaily or county
    if (
      (data.hits.length < 20 && location.type === 'municipality') ||
      (data.hits.length < 20 && location.type === 'county')
    ) {
      if (location.type === 'municipality') {
        // find the location object in searchOptions
        const locationObject = countiesAndMunicipalities.find(
          place => place.value === location.county
        );

        // update current location in redux
        dispatch({
          type: SET_LOCATION,
          locationObject
        });

        try {
          let { data } = await apiFetchJobs(term, location.county);

          // dispatch "no more jobs"-status
          if (!data.hits.length > 0) {
            dispatch({
              type: JOBS_NO_MORE
            });
          }

          const { hits } = data;

          // add an object indicating the changed location (used in scroll list)
          hits.unshift({
            changedLocation: true,
            oldLocation: location.value,
            newLocation: location.county
          });

          // add the jobs to the current hits list
          dispatch({
            type: JOBS_ADD_MORE,
            payload: data,
            offset: 0
          });
        } catch (error) {
          console.log(error);
        }
      } else if (location.type === 'county') {
        dispatch({
          type: SET_LOCATION,
          locationObject: { key: 'everywhere', text: 'Hela Sverige', value: '' }
        });

        try {
          const { data } = await apiFetchJobs(term, '');

          if (!data.hits.length > 0) {
            dispatch({
              type: JOBS_NO_MORE
            });
          }

          const { hits } = data;

          hits.unshift({
            changedLocation: true,
            oldLocation: location.value,
            newLocation: 'hela Sverige'
          });

          console.log(data);

          dispatch({
            type: JOBS_ADD_MORE,
            payload: data,
            offset: 0
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    dispatch({
      type: JOBS_FAILURE
    });
  }
};

export const fetchMoreJobs = (term, location, offset) => async dispatch => {
  try {
    // try to fetch more jobs in currently selected location
    const res = await apiFetchJobs(term, location.value, offset);

    // if the response didn't include job ads and current location is either municipality or county
    if (
      (!res.data.hits.length > 0 && location.type === 'municipality') ||
      (!res.data.hits.length > 0 && location.type === 'county')
    ) {
      // since a new place will be used, offset needs to be set to 0
      offset = 0;
      if (location.type === 'municipality') {
        // find the correct locationObject nd update redux
        const locationObject = countiesAndMunicipalities.find(
          place => place.value === location.county
        );

        dispatch({
          type: SET_LOCATION,
          locationObject
        });

        // fetch jobs in county
        const res = await apiFetchJobs(term, location.county, offset);

        if (!res.data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          });
        }

        const { hits } = res.data;

        // add an object indicating the changed location (used in scroll list)
        hits.unshift({
          changedLocation: true,
          oldLocation: location.value,
          newLocation: location.county
        });
        res.data = { ...res.data, hits };

        dispatch({
          type: JOBS_ADD_MORE,
          payload: res.data,
          offset
        });
      } else if (location.type === 'county') {
        // update redux store location to be "Hela Sverige".
        dispatch({
          type: SET_LOCATION,
          locationObject: { key: 'everywhere', text: 'Hela Sverige', value: '' }
        });

        let { data } = await apiFetchJobs(term, '', offset);

        if (!data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          });
        }

        const { hits } = res.data;

        // add an object indicating the changed location (used in scroll list)
        hits.unshift({
          changedLocation: true,
          oldLocation: location.value,
          newLocation: 'hela Sverige'
        });
        data = { ...data, hits };

        dispatch({
          type: JOBS_ADD_MORE,
          payload: data,
          offset
        });
      }
    } else if (!res.data.hits.length > 0) {
      dispatch({
        type: JOBS_NO_MORE
      });
    }

    dispatch({
      type: JOBS_ADD_MORE,
      payload: res.data,
      offset
    });
  } catch (error) {
    dispatch({
      type: JOBS_FAILURE
    });
  }
};

export const setSearchTerm = searchTerm => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  };
};

export const setLocation = location => {
  const locationObject = countiesAndMunicipalities.find(
    place => place.value === location
  );

  return {
    type: SET_LOCATION,
    locationObject
  };
};

export const selectJob = job => {
  return {
    type: JOB_SELECT,
    job
  };
};

export const unselectJob = () => {
  return {
    type: JOB_UNSELECT
  };
};
