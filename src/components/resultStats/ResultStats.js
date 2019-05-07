import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import breakpoints from '../../styles/breakpoints'

const ResultStats = ({
  total,
  processedList,
  sources,
  searchTerm,
  location,
  desktop
}) => {
  if (desktop) {
    return (
      <DesktopSearchMetadata>
        <p>
          {processedList ? processedList.length : 0} jobbannonser från {sources}{' '}
          webbplatser för {'\n'}
          <span className="bold" style={{ textTransform: 'capitalize' }}>
            {searchTerm}
          </span>{' '}
          i{' '}
          <span className="bold">
            {location ? location.text : 'hela Sverige'}
          </span>
        </p>
        {searchTerm && (
          <Link to="/overview" style={{ color: '#49efe1' }}>
            <Icon name="line graph" size="large" />
            Se yrkesöversikt
          </Link>
        )}
      </DesktopSearchMetadata>
    )
  } else {
    return (
      <>
        <P>
          Visar{' '}
          <span className="bold">
            {processedList ? processedList.length : 0}
          </span>{' '}
          av {total ? total.toLocaleString('se-SV') : 0} jobbannonser från
          {'\n'}
          <span className="bold">{sources}</span> webbplatser.{'\n'}
        </P>
      </>
    )
  }
}

export default ResultStats

const DesktopSearchMetadata = styled.div`
  p {
    margin: 0;
    white-space: pre-line;
  }
`

const P = styled.p`
  margin: 0;
  padding: 0 0 2rem;
  align-self: center;
  text-align: center;
  font-size: 20px;
  white-space: pre-line;

  @media screen and (max-width: ${breakpoints.tablet}) {
    padding: 1rem;
  }
`
