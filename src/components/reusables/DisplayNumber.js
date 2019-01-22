import React from 'react'
import styled from 'styled-components'

const DisplayNumber = ({ children }) => <BigFontSpan>{children}</BigFontSpan>

export default DisplayNumber

const BigFontSpan = styled.span`
  font-size: ${props => props.theme.fontSizeLarge};
  font-weight: bold;
`
