import React from 'react'
import styled from 'styled-components'

const BoldText = ({ children }) => <BoldSpan>{children}</BoldSpan>

export default BoldText

const BoldSpan = styled.span`
  font-weight: bold;
`
