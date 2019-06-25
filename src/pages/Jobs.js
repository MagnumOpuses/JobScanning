import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectJob,
  unselectJob,
  setLocation,
  fetchJobs
} from '../redux/actions';
import styled from 'styled-components';
import { ResultStats } from '../components';
import { Icon } from 'semantic-ui-react';
import { JobList, JobDetails, PageHeader } from '../components';
import breakpoints from '../styles/breakpoints';
import MapComponent from '../components/map/map';
import getNumberOfJobsInPlace from '../utils/getNumberOfJobsInPlace';
import { countiesAndMunicipalities } from '../utils/searchOptions';

class Jobs extends Component {
  constructor(props) {
    super(props);
    // sidemenuVisible is false to render map comp and get results there also
    this.state = {
      sidemenuVisible: false,
      headerHeight: '',
      headerVisible: true,
      lastScrollTop: 0
    };
    this.headerRef = React.createRef();
  }

  componentDidMount() {
    // an android bug makes searchbar apart of viewpoint, we calc correct viewpoint
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });

    this.setState({ 
      headerHeight: this.headerRef.current.clientHeight,
      sidemenuVisible: true 
    });
    this.mapData = {
      total: 0,
      result: []
    };
  }

  updateMap(hits) {
    let adsByLocation = getNumberOfJobsInPlace(hits);
    this.mapData.total = adsByLocation.sweden;
    this.mapData.result = Object.keys(adsByLocation).map(function(key) {
      return { name: key, value: adsByLocation[key] };
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.hits !== this.props.hits) this.updateMap(nextProps.hits);
    return true;
  }

  componentDidUpdate() {
    if (this.headerRef.current.clientHeight !== this.state.headerHeight) {
      this.setState({
        headerHeight: this.headerRef.current.clientHeight
      });
    }
  }

  handleScroll = ref => {
    const { headerHeight } = this.state;
    // console.log(this.state);

    const refScrollTop = ref.current.scrollTop;
    // const headerHeight = this.headerRef.current.offsetHeight
    // console.log(headerHeight)

    const { lastScrollTop } = this.state;

    if (Math.abs(this.state.lastScrollTop - refScrollTop) <= 5) {
      return;
    }

    if (refScrollTop > lastScrollTop && refScrollTop > headerHeight) {
      this.setState({
        headerVisible: false,
        lastScrollTop: refScrollTop
      });
    } else {
      this.setState({
        headerVisible: true,
        lastScrollTop: refScrollTop
      });
    }
  };

  selectOrUnselectJob = job => {
    if (job.id === this.props.selectedJob.id) {
      this.props.unselectJob();
    } else {
      this.props.selectJob(job);
      this.props.history.replace(
        `${this.props.history.location.pathname}/${job.id}`
      );
    }
  };
  showSidemenu = visible => {
    this.setState({ sidemenuVisible: visible });
  }
  setLocationAndFetch = location => {
    const { fetchJobs, searchTerm, setLocation, history } = this.props;

    const locationObject = countiesAndMunicipalities.find(
      place => place.value === location
    );
    fetchJobs(searchTerm, locationObject);
    setLocation(location);
    history.push(`/jobs/${searchTerm.toLowerCase()}/${locationObject.value}`);
  };

  render() {
    const { hits, selectedJob } = this.props;
    const { headerHeight, headerVisible } = this.state;
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header
          ref={this.headerRef}
          // className={headerVisible ? 'visible' : 'hidden'}
        >
          <PageHeader />
        </Header>

        <FlexContainer
          visible={this.state.sidemenuVisible}
        >
          <div className="left-container">
            {hits.length > 0 && <ResultStats />}
            <JobList
              selectOrUnselectJob={this.selectOrUnselectJob}
              handleScroll={this.handleScroll}
            />
          </div>

          {Object.keys(selectedJob).length > 0 && (
            <JobDetails
              key={selectedJob.id}
              selectedJob={selectedJob}
              unselectJob={this.props.unselectJob}
            />
          )}

          <div className={this.state.sidemenuVisible ? 'right-container' : 'right-container z-upp'}>            
            <Button
              visible={this.state.sidemenuVisible}
              onClick={() =>
                this.setState(prevState => ({
                  sidemenuVisible: !prevState.sidemenuVisible
                }))
              }
              style={{ margin: 0 }}
            >
              <Icon
                className="menu-icon"
                name={
                  this.state.sidemenuVisible
                    ? 'angle double left'
                    : 'angle double right'
                }
                size="large"
              />
            </Button>

            <MapComponent
              mode="county"
              height={'100%'}
              width={'auto'}
              sidemenu={this.showSidemenu}
              mapData={this.mapData}
              location={this.props.location.value}
              q={this.props.searchTerm}
              setLocationAndFetch={this.setLocationAndFetch}
            />
          </div>
        </FlexContainer>
      </div>
    );
  }
}

function mapStateToProps({ ads }) {
  const { hits, selectedJob, searchTerm, location } = ads;

  return {
    hits,
    selectedJob,
    searchTerm,
    location
  };
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob, setLocation, fetchJobs }
)(Jobs);

const Header = styled.header`
  background: #fff;
  transition: all 0.3s;

  &.visible {
    @media only screen and (max-width: ${breakpoints.tablet}) {
      transform: translateY(0px);
    }
  }

  &.hidden {
    @media only screen and (max-width: ${breakpoints.tablet}) {
      transform: translateY(-269px);
    }
  }
`;

const FlexContainer = styled.main`
  height: calc(var(--vh, 1vh) * 100 - 70px);
  width: 100%;
  display: flex;
  overflow: hidden;
  position: relative;
  @media only screen and (min-width: ${breakpoints.largerThentablet}) {
    height: calc(var(--vh, 1%) * 100 - 130px);
  }


  @media only screen and (min-width: ${breakpoints.tablet}) {
    padding: 0;
  }

  @media only screen and (min-width: 1366px) {
    width: 1366px;
    margin: 0 auto;
  }

  .left-container {
    position: relative;
    width: ${({ visible }) => (visible ? '480px' : '0px')};
    max-width: 480px;
    opacity: ${({ visible }) => (visible ? '1' : '0')};
    flex-direction: column;
    transition: width 0.5s;
    background: #fff;
    z-index: 15;

    @media (max-width: ${breakpoints.tabletLandscape}) {
      width: ${({ visible }) => (visible ? '50%' : '0px')};
      max-width: 50%;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: ${({ visible }) => (visible ? '100%' : '0px')};
      max-width: 100%;
    }
  }

  .right-container {
    position: relative;
    flex: 1;

    h2 {
      font-weight: normal !important;
    }

    p {
      font-size: 20px !important;
    }
  }
  .z-upp {
    z-index: 100;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  min-width: 50px;
  height: 50px;
  width: 50px;
  color: #4aefe2;
  border: 1px solid #4aefe2;
  border-radius: 50%;
  box-shadow: 0 1px 3px #000;
  background: #fff;
  position: absolute;
  top: 25px;
  left: -25px;
  z-index: 20;

  @media only screen and (max-width: ${breakpoints.tablet}) {
    left: ${({ visible }) => (visible ? '-75px' : '25px')};

    .menu-icon::before {
      content: ${({ visible }) => (visible ? '"\f279"' : '"\f0ca"')} !important;
    }
  }
`;
