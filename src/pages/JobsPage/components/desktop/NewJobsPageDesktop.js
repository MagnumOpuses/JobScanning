import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectJob, unselectJob } from '../../../../redux/actions'
import styled from 'styled-components'
import _ from 'lodash'
import {
  SourceRanking,
  GridContainer,
  DescriptionContainer,
  JobMap
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
    const { activeItem } = this.state
    const { selectedJob } = this.props

    return (
      <GridContainer rows={'100px calc(100vh - 100px)'} center>
        <PageHeaderAds />
        <GridContainer width={'75%'} columns={'2fr 3fr'}>
          <List>
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
            {this.state.activeItem === 'list' && (
              <AdsList selectAd={this.selectAd} />
            )}
            {this.state.activeItem === 'map' && <JobMap />}
            {this.state.activeItem === 'overview' && <SourceRanking />}
          </List>
          <div>
            <Details>
              {Object.keys(selectedJob).length > 0 ? (
                <JobDetailsDesktop selectedAd={selectedJob} />
              ) : (
                <div style={{ height: '40vh' }} />
              )}
            </Details>
            <Text>
              {Object.keys(selectedJob).length > 0 ? (
                <DescriptionContainer
                  text={selectedJob.content.text}
                  source={selectedJob.duplicatedGroupId}
                />
              ) : (
                <div style={{ height: '40vh' }} />
              )}
            </Text>
          </div>
        </GridContainer>
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

const List = styled.div`
  grid-row: 1/2;
  grid-column: 1/2;
  overflow: auto;
  height: 75vh;
`

const Details = styled.div`
  padding: 2rem 4rem 4rem 4rem;
`

const Text = styled.div`
  padding: 2rem 4rem 1rem 4rem;
`
