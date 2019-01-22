import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../../redux/actions'
import styled from 'styled-components'
import format from 'date-fns/format'
import _ from 'lodash'
import {
  BoldText,
  Ellipse,
  SourceRanking,
  GridContainer,
  DescriptionContainer,
  JobMap,
  ResultStats
} from '../../../../components'
import JobDetailsDesktop from './JobDetailsDesktop'
import PageHeaderAds from './NewPageHeaderAds'
import AdsList from '../../../../components/jobList/AdsList'
import theme from '../../../../styles/theme'

class AdsPage extends Component {
  state = { activeItem: 'list' }

  changeComponent = componentName => {
    this.setState({ activeItem: componentName })
  }

  selectAd = selectedAd => {
    const duplicatedGroupId = _.filter(this.props.hits, item => {
      return item.group.id === selectedAd.group.id
    })

    const selectedJob = { ...selectedAd, duplicatedGroupId }
    this.props.selectJob(selectedJob)

    this.setState({
      selected: true
    })
  }

  render() {
    const { selectedJob } = this.props

    return (
      <GridContainer rows={'100px calc(100vh - 100px)'} center>
        <PageHeaderAds />

        <GridContainer
          width={'75%'}
          rows={'50px auto'}
          columns={'2fr 3fr'}
          margin={'5rem 0 0 0'}
        >
          <Menu>
            <MenuItem
              selected={this.state.activeItem === 'list'}
              onClick={() => this.changeComponent('list')}
            >
              LISTA
            </MenuItem>
            <MenuItem
              selected={this.state.activeItem === 'map'}
              onClick={() => this.changeComponent('map')}
            >
              KARTA
            </MenuItem>
            <MenuItem
              selected={this.state.activeItem === 'overview'}
              onClick={() => this.changeComponent('overview')}
            >
              ÖVERSIKT
            </MenuItem>
          </Menu>
          <SideMenu>
            <ResultStats />
            {this.state.activeItem === 'list' && (
              <AdsList selectAd={this.selectAd} />
            )}
            {this.state.activeItem === 'map' && <JobMap desktop />}
            {this.state.activeItem === 'overview' && <SourceRanking />}
          </SideMenu>
          <div style={{ gridRow: '2/3', paddingLeft: '2rem' }}>
            {Object.keys(selectedJob).length > 0 && (
              <>
                <H2>{selectedJob.header}</H2>
                <h3>{selectedJob.employer.name}</h3>
                <p>
                  <BoldText>Kommun:</BoldText>{' '}
                  {selectedJob.location &&
                    selectedJob.location.translations['sv-SE']}
                </p>
                <p>
                  <BoldText>Publicerad:</BoldText>{' '}
                  {format(selectedJob.source.firstSeenAt, 'YYYY-MM-DD HH:mm')}
                </p>
              </>

              // <JobDetailsDesktop selectedAd={selectedJob} />
            )}

            {Object.keys(selectedJob).length > 0 && (
              <div>
                <DescriptionContainer
                  text={selectedJob.content.text}
                  source={selectedJob.duplicatedGroupId}
                />
                {/* <p>{selectedJob.content.text.substring(0, 1200)}</p> */}
              </div>
            )}
          </div>
        </GridContainer>
        {/* <EllipseContainer>
          <Ellipse
            height="220px"
            width="170px"
            bottom="-60px"
            right="-20px"
            bgcolor={theme.secondary}
            zIndex={-2}
          />
          <Ellipse
            height="180px"
            width="140px"
            bottom="-60px"
            right="82px"
            bgcolor={theme.brightSecondary}
            zIndex={-1}
          />
        </EllipseContainer> */}
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, selectedJob } = ads

  return {
    hits,
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  { selectJob, unselectJob }
)(AdsPage)

const Menu = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  height: 50px;
  display: flex;
  align-items: center;
`

const MenuItem = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: ${props => (props.selected ? theme.secondary : theme.brightSecondary)};
  transition: all 0.2s;

  &:hover {
    color: ${theme.secondary};
  }
`

const SideMenu = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
  height: 75vh;
`

const EllipseContainer = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: 220px;
  width: 250px;
  overflow: hidden;
  background: linear-gradient(#fff 0%, rgba(0, 0, 0, 0) 75%);
`

const H2 = styled.h2`
  display: inline-block;
  margin: 0;
  font-size: 2.6rem;
  font-weight: normal;
  word-break: break-word;
  hyphens: auto;
`
