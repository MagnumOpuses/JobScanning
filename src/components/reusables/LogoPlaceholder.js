import React from 'react'
import styled from 'styled-components'

const LogoPlaceholder = ({ employer, padding, desktop }) => {
  if (employer.logoUrl) {
    return (
      <StyledImg src={employer.logoUrl} padding={padding} desktop={desktop} />
    )
  } else if (employer.name) {
    return <StyledH3>{employer.name.match(/\b\w/g).join('')}</StyledH3>
  } else {
    return null
  }
}

export default LogoPlaceholder

const StyledImg = styled.img`
  height: ${props => (props.desktop ? '100%' : 'auto')};
  width: ${props => (props.desktop ? 'auto' : '100%')};
  padding: ${props => (props.padding ? '0.5rem' : '0')};
`

const StyledH3 = styled.p`
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75px;
  width: 75px;
  margin: 0 25px 5px 0 !important;
  border-radius: 50%;
  font-size: 25px;
  font-weight: 700;
  overflow: hidden;
  text-align: center;
  word-break: break-word;
  hyphens: auto;
  background: ${props => props.theme.green0};
  shape-outside: circle(50%);
`
