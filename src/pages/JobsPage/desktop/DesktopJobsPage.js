import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectJob, unselectJob, setLocation } from '../../../redux/actions';
import styled from 'styled-components';
import { ResultStats } from '../../../components';
import { Icon } from 'semantic-ui-react';
import PageHeaderAds from '../components/PageHeaderAds';
import JobAdsList from '../../../components/jobAdsList/JobAdsList';
import theme from '../../../styles/theme';
import DesktopJobDetails from './DesktopJobDetails';
import breakpoints from '../../../styles/breakpoints';
import map_picture from '../../../images/map_picture.png';
import MapComponent from '../../../components/map/map';

class DesktopJobsPage extends Component {
  state = {
    sidemenuVisible: true,
    mapData :
    {
      result: 
      [
        { 
          "name": 'Stockholms län',
          "value": 50
        },
        { 
          "name": 'Nacka',
          "value": 25
        },
        {
          "name": "Botkyrka",
          "value": 25
        }
      ],
      total: 111
    }

  };

  selectOrUnselectJob = job => {
    if (job.id === this.props.selectedJob.id) {
      this.props.unselectJob();
    } else {
      this.props.selectJob(job);
    }
  };

  render() {
    const { hits, selectedJob } = this.props;

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <PageHeaderAds />

        <FlexContainer visible={this.state.sidemenuVisible}>
          <div className="left-container">
            {hits.length > 0 && <ResultStats />}
            <JobAdsList selectOrUnselectJob={this.selectOrUnselectJob} />
          </div>

          {Object.keys(selectedJob).length > 0 && (
            <DesktopJobDetails
              key={selectedJob.id}
              selectedJob={selectedJob}
              unselectJob={this.props.unselectJob}
            />
          )}

          <div className="right-container">
            <Button
              onClick={() =>
                this.setState(prevState => ({
                  sidemenuVisible: !prevState.sidemenuVisible
                }))
              }
              style={{ margin: 0 }}
            >
              <Icon
                name="angle double left"
                size="large"
                style={{
                  transform: this.state.sidemenuVisible
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)'
                }}
              />
            </Button>
            <MapComponent
              mode="county"
              height={'100%'}
              width={'auto'}
              mapData={this.state.mapData}
              location={this.props.location.value}
              q={this.props.searchTerm}
              setLocation={this.props.setLocation}
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
  { selectJob, unselectJob, setLocation }
)(DesktopJobsPage);

const FlexContainer = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  /* padding: 0 50px; */
  position: relative;

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
    overflow: hidden;
    background: #fff;

    @media (max-width: ${breakpoints.tabletLandscape}) {
      width: ${({ visible }) => (visible ? '50%' : '0px')};
      max-width: 50%;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: ${({ visible }) => (visible ? '100%' : '0px')};
      max-width: 100%;
      overflow: hidden;
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
  z-index: 2;
`;
