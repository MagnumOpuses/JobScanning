import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import distanceInWordsStrict from 'date-fns/distance_in_words_strict'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'
import { Icon } from 'semantic-ui-react'
import { LogoPlaceholder } from '../../../components'

const JobMapWindow = ({ marker, markers, closeMapWindow, history }) => {
  console.log(marker)

  const {
    application,
    employer,
    group,
    header,
    location: { translations },
    source: { firstSeenAt }
  } = marker
  return (
    <MapWindowContainer>
      <MapWindow key={marker.id}>
        <InfoContainer>
          <ItemTitle>{header}</ItemTitle>
          <p>
            {employer && employer.name} &#8226;{' '}
            {translations && translations['sv-SE']}
          </p>
          <p>Inlagd: {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}</p>
          {/* <p>
                  {application.deadline
                    ? distanceInWordsStrict(Date.now(), application.deadline, {
                        addSuffix: true,
                        locale: sv
                      })
                    : 'Se annonsen för datum'}
                </p> */}
        </InfoContainer>
        <StyledSpan onClick={() => history.push(`/jobs/${group.id}`)}>
          <Icon name="arrow right" size="big" />
        </StyledSpan>
      </MapWindow>
    </MapWindowContainer>
    // <MapWindowContainer>
    //   {markers.map((item, i) => {
    //     const {
    //       application,
    //       employer,
    //       group,
    //       header,
    //       location: { translations },
    //       source: { firstSeenAt }
    //     } = item

    //     if (item.location.googleMaps.id === marker.location.googleMaps.id) {
    //       return (
    //         <MapWindow key={i}>
    //           <InfoContainer>
    //             <ItemTitle>{header}</ItemTitle>
    //             <p>
    //               {employer && employer.name} &#8226;{' '}
    //               {translations && translations['sv-SE']}
    //             </p>
    //             <p>Inlagd: {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}</p>
    //             {/* <p>
    //               {application.deadline
    //                 ? distanceInWordsStrict(Date.now(), application.deadline, {
    //                     addSuffix: true,
    //                     locale: sv
    //                   })
    //                 : 'Se annonsen för datum'}
    //             </p> */}
    //           </InfoContainer>
    //           <StyledSpan onClick={() => history.push(`/jobs/${group.id}`)}>
    //             <Icon name="arrow right" size="big" />
    //           </StyledSpan>
    //         </MapWindow>
    //       )
    //     }
    //   })}
    // </MapWindowContainer>
  )
}

export default withRouter(JobMapWindow)

const MapWindowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 30vh;
  position: fixed;
  left: -48%;
  right: 52%;
  background: #fff;
  box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.8);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
`

const MapWindow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 2rem 0 2rem 2rem;
`

const InfoContainer = styled.div`
  flex: 1 0 80%;
  overflow: hidden;
`

const ItemTitle = styled.h2`
  font-size: ${props => props.theme.fontSizeMedium};
  margin-top: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const StyledSpan = styled.span`
  flex: 1;
  padding: 0 1rem;
`
