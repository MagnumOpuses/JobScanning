import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonLink = ({ path, label, bgcolor, margin }) => (
  <StyledLink to={path} bgcolor={bgcolor} margin={margin}>
    {label}
  </StyledLink>
)

export default ButtonLink

const StyledLink = styled(Link)`
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  margin: ${props => (props.margin ? props.margin : 'none')};
  padding: 1.3rem 7rem;
  background: ${props => props.bgcolor};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  border-radius: 10rem;
`
