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
  selectedJob: {
    id: '0729d6a7-9a3a-47ea-ae67-f5939a9a812d',
    header: 'Ekonomiassistent',
    content:
      'Platsbeskrivning Proforma Clinic är en privat plastikkirurgisk klinik som ingår i MFAF Gruppen som även har verksamheter för utveckling och tillverkning av hudvårdsprodukterna Cicamed. På kliniken utförs alla typer av plastikkirurgiska ingrepp samt synfelskorrektioner med laser och linsbyten, allt av specialistutbildade läkare. Andra behandlingar erbjuds också såsom fillers, botox, hudvård m.m. Vi söker en ekonomiassistent med placering på Mariatorget på Södermalm. Dina huvudsakliga arbetsuppgifter är: . Att sköta den löpande bokföringen. . Handha lev- och kundreskontran samt kundkontakter avseende betalningar. . Göra avstämningar och vissa ekonomiska kontroller. . Vara behjälplig vid månads- och årsbokslut samt sköta viss rapportering. . Övrigt ...',
    markup:
      '<document><paragraph>Platsbeskrivning</paragraph><paragraph>Proforma Clinic är en privat plastikkirurgisk klinik som ingår i MFAF Gruppen som även har verksamheter för utveckling och tillverkning av hudvårdsprodukterna Cicamed. På kliniken utförs alla typer av plastikkirurgiska ingrepp samt synfelskorrektioner med laser och linsbyten, allt av specialistutbildade läkare. Andra behandlingar erbjuds också såsom fillers, botox, hudvård m.m.</paragraph><paragraph>Vi söker en ekonomiassistent med placering på Mariatorget på Södermalm.</paragraph><header>Dina huvudsakliga arbetsuppgifter är:</header><paragraph>. Att sköta den löpande bokföringen.</paragraph><paragraph>. Handha lev- och kundreskontran samt kundkontakter avseende betalningar.</paragraph><paragraph>. Göra avstämningar och vissa ekonomiska kontroller.</paragraph><paragraph>. Vara behjälplig vid månads- och årsbokslut samt sköta viss rapportering.</paragraph><paragraph>. Övrigt förekommande uppgifter på en ekonomiavdelning.</paragraph><paragraph>Eftersom vi är ett ...</paragraph>',
    employer: {
      name: 'Proforma Clinic AB'
    },
    location: 'Stockholm',
    geolocation: {
      lng: '59.7413909096437',
      lat: '18.6528054731035'
    },
    application: {
      site: {
        url: null,
        name: null
      }
    },
    detected_keywords: {
      occupations: ['ekonomiassistent'],
      skills: [
        'årsbokslut',
        'månadsbokslut',
        'rapportering',
        'bokföring',
        'avstämningar'
      ],
      traits: ['positiv', 'gillar utmaningar', 'serviceminded']
    },
    sources: [
      {
        id: '0729d6a7-9a3a-47ea-ae67-f5939a9a812d',
        name: 'Indeed',
        url: 'https://se.indeed.com/visajobb?jk=b650ebfa96225ce4'
      }
    ]
  },
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
