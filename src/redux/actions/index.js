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
  console.log(term, location);

  dispatch({
    type: JOBS_REQUEST,
    term,
    location
  });

  try {
    let { data } = await apiFetchJobs(term, location.value);

    if (!data.hits.length > 0) {
      dispatch({
        type: JOBS_FAILURE
      });
    }

    dispatch({
      type: JOBS_SUCCESS,
      payload: data,
      offset: 0
    });

    if (
      (data.hits.length < 20 && location.type === 'municipality') ||
      (data.hits.length < 20 && location.type === 'county')
    ) {
      if (location.type === 'municipality') {
        const locationObject = countiesAndMunicipalities.find(
          place => place.value === location.county
        );

        dispatch({
          type: SET_LOCATION,
          locationObject
        });

        try {
          let { data } = await apiFetchJobs(term, location.county);

          if (!data.hits.length > 0) {
            dispatch({
              type: JOBS_NO_MORE
            });
          }

          const { hits } = data;

          hits.unshift({
            changedLocation: true,
            oldLocation: location.value,
            newLocation: location.county
          });

          dispatch({
            type: JOBS_ADD_MORE,
            payload: data,
            offset: 0
          });

          console.log(data);
        } catch (error) {
          console.log(error);
        }
      } else if (location.type === 'county') {
        try {
          const { data } = await apiFetchJobs(term, '');
          console.log(data);
        } catch (error) {}
      }
    }

    data = {
      ...data,
      usedSearchTerm: term,
      usedLocation: location
    };
  } catch (error) {
    console.log(error);

    dispatch({
      type: JOBS_FAILURE
    });
  }
};

export const fetchMoreJobs = (term, location, offset) => async dispatch => {
  try {
    const res = await apiFetchJobs(term, location.value, offset);

    if (
      (!res.data.hits.length > 0 && location.type === 'municipality') ||
      (!res.data.hits.length > 0 && location.type === 'county')
    ) {
      offset = 0;
      if (location.type === 'municipality') {
        const locationObject = countiesAndMunicipalities.find(
          place => place.value === location.county
        );

        dispatch({
          type: SET_LOCATION,
          locationObject
        });

        const res = await apiFetchJobs(term, location.county, offset);

        if (!res.data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          });
        }

        const { hits } = res.data;

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
        dispatch({
          type: SET_LOCATION,
          locationObject: { key: 'everywhere', text: 'Hela Sverige', value: '' }
        });

        const { data } = await apiFetchJobs(term, '', offset);

        if (!data.hits.length > 0) {
          dispatch({
            type: JOBS_NO_MORE
          });
        }

        const { hits } = res.data;

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
    console.log(error);

    // dispatch({
    //   type: JOBS_FAILURE
    // })
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
