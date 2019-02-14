import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'
import {
  LogoPlaceholder,
  NoResultsBox,
  PageHeader,
  GridContainer,
  DescriptionContainer
} from '../components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import { BoldText } from '../components'
import images from '../images/index'

class AdDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const {
      application,
      content,
      employer,
      header,
      location,
      sources
    } = this.props.selectedJob

    const siteName = sources.length > 1 ? 'Se nedan' : sources[0].name

    return (
      <GridContainer rows={'85px 1fr'}>
        <PageHeader ads />

        {!Object.keys(this.props.selectedJob).length > 0 ? (
          <NoResultsBox adDetails />
        ) : (
          <GridContainer>
            <StyledHeader>
              <div>
                <Link to="/jobs">{`< tillbaka`}</Link>
              </div>
              <RightDiv>
                <div>
                  <p>Publicerad hos</p>
                </div>
                {[siteName] in images ? (
                  <div>
                    <SourceLogo src={images[siteName]} alt={siteName} />
                  </div>
                ) : (
                  <p>{siteName}</p>
                )}
              </RightDiv>
            </StyledHeader>

            <Heading>
              <LogoPlaceholder employer={employer} padding={true} />
              <h1
                style={{
                  fontSize: '20px',
                  margin: '0 0 0 2rem'
                }}
              >
                {header}
              </h1>
            </Heading>

            <InfoContainer>
              <p>
                <BoldText>Kommun:</BoldText> {location}
              </p>
              {/* <p>
            <BoldText>Publicerad:</BoldText>{' '}
            {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}
          </p> */}
              <p>
                <BoldText>Sök jobbet senast:</BoldText>{' '}
                {application.deadline
                  ? format(new Date(application.deadline), 'D MMMM', {
                      locale: sv
                    })
                  : 'Se annonsen för datum'}
              </p>
            </InfoContainer>

            <StyledDiv>
              <DescriptionContainer text={content} sources={sources} />
            </StyledDiv>
          </GridContainer>
        )}
      </GridContainer>
    )
  }
}

function mapStateToProps({ ads }) {
  const { hits, processedList, selectedJob } = ads

  return {
    hits,
    processedList,
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  null
)(AdDetails)

const StyledHeader = styled.div`
  grid-row: 1 / 2;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 1rem;
`

const SourceLogo = styled.img`
  max-height: 4rem;
  max-width: 100%;
  height: auto;
`

const RightDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`

const StyledDiv = styled.div`
  padding: 3rem 1rem;
  box-shadow: 0 -0.3rem 0.5rem rgba(0, 0, 0, 0.5);
`

const Heading = styled.div`
  border-top: 2px solid ${props => props.theme.green4};
  border-bottom: 2px solid ${props => props.theme.green4};

  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;

  width: 100%;
  overflow: hidden;
`

const InfoContainer = styled.div`
  padding: 1.5rem;
`
