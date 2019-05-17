import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectJob, unselectJob } from '../../../redux/actions';
import styled from 'styled-components';
import { ResultStats } from '../../../components';
import { Icon } from 'semantic-ui-react';
import PageHeaderAds from '../components/PageHeaderAds';
import JobAdsList from '../../../components/jobAdsList/JobAdsList';
import theme from '../../../styles/theme';
import DesktopJobDetails from './DesktopJobDetails';
import breakpoints from '../../../styles/breakpoints';
import map_picture from '../../../images/map_picture.png';

class DesktopJobsPage extends Component {
  state = {
    sidemenuVisible: true
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

        <FlexContainer>
          <LeftContainer visible={this.state.sidemenuVisible}>
            {hits.length > 0 && <ResultStats />}
            <JobAdsList selectOrUnselectJob={this.selectOrUnselectJob} />
          </LeftContainer>

          {Object.keys(selectedJob).length > 0 && (
            <DesktopJobDetails
              key={selectedJob.id}
              selectedJob={selectedJob}
              unselectJob={this.props.unselectJob}
            />
          )}

          <RightContainer>
            <Button
              onClick={() =>
                this.setState(prevState => ({
                  sidemenuVisible: !prevState.sidemenuVisible
                }))
              }
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

            <div
              style={{
                height: '100%',
                width: '100%',
                background: `#444 url(${map_picture}) center/cover no-repeat`
              }}
            />
          </RightContainer>
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
  { selectJob, unselectJob }
)(DesktopJobsPage);

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

const FlexContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 0 50px;
  position: relative;

  @media (max-width: ${breakpoints.tabletLandscape}) {
    padding: 0;
  }
`;

const LeftContainer = styled.div`
  position: relative;
  width: ${({ visible }) => (visible ? '480px' : '0px')};
  max-width: 480px;
  margin-right: ${({ visible }) => (visible ? '15px' : '0px')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  flex-direction: column;
  transition: width 0.5s;
  overflow: hidden;

  @media (max-width: ${breakpoints.tabletLandscape}) {
    width: ${({ visible }) => (visible ? '50%' : '0px')};
    max-width: 50%;
  }

  .to-overview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100px;
    width: 90%;
    margin: 10px auto;
    padding: 5px;
    text-align: center;
    color: #000;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    &:hover {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      border: 1px solid #a6f3ed;
    }

    h2 {
      font-size: 20px;
      font-weight: normal;
    }

    p {
      font-size: 18px;
    }
  }
`;

const RightContainer = styled.div`
  position: relative;
  flex: 1;

  h2 {
    font-weight: normal !important;
  }

  p {
    font-size: 20px !important;
  }
`;
