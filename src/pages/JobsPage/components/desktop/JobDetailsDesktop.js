import React from 'react'
import styled from 'styled-components'
import { BoldText, LogoPlaceholder } from '../../../../components'
import format from 'date-fns/format'
import sv from 'date-fns/locale/sv'

const JobDetailsDesktop = ({ selectedAd }) => {
  const {
    application: { deadline },
    employer,
    header,
    location,
    source: { firstSeenAt }
  } = selectedAd
  console.log('​JobDetailsDesktop -> selectedAd', selectedAd)

  return (
    <Grid>
      <Header>
        <div>
          <JobHeader>{header}</JobHeader>
        </div>
        <div style={{ justifySelf: 'end' }}>
          <LogoPlaceholder employer={employer} padding={false} desktop={true} />
        </div>
      </Header>
      <Content>
        <p>
          <BoldText>Kommun:</BoldText>{' '}
          {location && location.translations['sv-SE']}
        </p>
        <p>
          <BoldText>Publicerad:</BoldText>{' '}
          {format(firstSeenAt, 'YYYY-MM-DD HH:mm')}
        </p>
        {/* <p>
          <BoldText>Sök jobbet senast:</BoldText>{' '}
          {deadline
            ? format(new Date(deadline), 'D MMMM', {
                locale: sv
              })
            : 'Se annonsen för datum'}
        </p> */}
      </Content>
    </Grid>
  )
}

export default JobDetailsDesktop

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: minmax(30%, auto) 1fr;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1em;
`

const Header = styled.div`
  grid-row: 1/2;
  grid-column: 1/3;
  align-items: center;
  display: grid;
  grid-template-columns: auto auto;
`

const Content = styled.div`
  grid-row: 2/3;
  grid-column: 1/2;
`

const JobHeader = styled.h2`
  display: inline-block;
  margin: 0;
  font-size: 2.6rem;
  font-weight: normal;
  word-break: break-word;
  hyphens: auto;
`
