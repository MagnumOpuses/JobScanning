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
  float: left;
  width: 100px;
  margin: 0 25px 5px 5px !important;
`

const StyledH3 = styled.p`
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 0 25px 5px 5px !important;
  border-radius: 50%;
  font-size: 25px;
  font-weight: 700;
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  hyphens: auto;
  color: #fff;
  background: ${props => props.theme.green4};
  shape-outside: circle(50%);
`
