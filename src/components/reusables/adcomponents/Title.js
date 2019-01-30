import React from 'react'
import styled from 'styled-components'
import { LogoPlaceholder } from '../../'

const Title = ({ employer, adHeader }) => (
  <StyledDiv>
    <LogoPlaceholder employer={employer} padding={true} />
    <h1
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        margin: '0 0 0 2rem'
      }}
    >
      {adHeader}
    </h1>
  </StyledDiv>
)

export default Title

const StyledDiv = styled.div`
  grid-row: 2 / 3;
  border-top: 2px solid ${props => props.theme.green4};
  border-bottom: 2px solid ${props => props.theme.green4};

  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;

  width: 100%;
  overflow: hidden;
`
