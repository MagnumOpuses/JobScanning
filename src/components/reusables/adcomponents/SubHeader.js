import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import images from '../../../images/index'

const SubHeader = ({ siteName }) => (
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
)

export default SubHeader

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
