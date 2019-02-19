import React from 'react'
import styled from 'styled-components'

const LogoPlaceholder = ({ employer, padding }) => {
  if (employer.logoUrl) {
    return <StyledImg src={employer.logoUrl} padding={padding} />
  } else if (employer.name) {
    return (
      <StyledH3>
        {employer.name
          .match(/\b\w/g)
          .slice(0, 3)
          .join('')}
      </StyledH3>
    )
  } else {
    return null
  }
}

export default LogoPlaceholder

const StyledImg = styled.img`
  width: 100px;
  margin-right: 1.5rem;
`

const StyledH3 = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 0 25px 0 15px !important;
  border-radius: 50%;
  font-size: 25px;
  font-weight: 700;
  overflow: hidden;
  text-align: center;
  text-transform: uppercase;
  word-break: break-word;
  hyphens: auto;
  color: #fff;
  background: ${props => props.theme.green3};
`
