import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import { Icon } from 'semantic-ui-react'
import { LogoPlaceholder } from '../../../components'

const JobMapWindow = ({ marker, allMarkers, closeMapWindow, history }) => {
  return (
    <MapWindowContainer>
      {allMarkers.map((item, i) => {
        const {
          application,
          employer,
          group,
          header,
          location: { translations },
          source: { firstSeenAt }
        } = item

        if (item.location.googleMaps.id === marker.location.googleMaps.id) {
          return (
            <MapWindow key={i}>
              <ImgContainer>
                <LogoPlaceholder employer={employer} />
              </ImgContainer>

              <InfoContainer>
                <ItemTitle>{header}</ItemTitle>
                <p>{translations ? translations['sv-SE'] : 'Finns inte'}</p>
                <p>Inlagd: {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}</p>
                <p>
                  {application.deadline
                    ? distanceInWordsStrict(Date.now(), application.deadline, {
                        addSuffix: true,
                        locale: sv
                      })
                    : 'Se annonsen för datum'}
                </p>
              </InfoContainer>
              <StyledSpan onClick={() => history.push(`/ads/${group.id}`)}>
                <Icon name="arrow right" size="big" />
              </StyledSpan>
            </MapWindow>
          )
        }
      })}
    </MapWindowContainer>
  )
}

export default withRouter(JobMapWindow)

const MapWindowContainer = styled.div`
  position: fixed;
  left: -50%;
  right: 50%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.8);
`

const MapWindow = styled.div`
  width: 90vw;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  z-index: 1000;
  padding: 1rem 0 1rem 1rem;
`

const ImgContainer = styled.div`
  flex: 1;
`

const InfoContainer = styled.div`
  flex: 2;
  overflow: hidden;
  padding-left: 1rem;
`

const ItemTitle = styled.h2`
  font-size: ${props => props.theme.fontSizeMedium};
  margin-top: 0;
  text-decoration: underline;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledSpan = styled.span`
  flex: 0;
  padding: 0 1rem;
`
