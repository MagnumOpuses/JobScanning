import React from 'react'
import styled from 'styled-components'
import { Loader } from 'semantic-ui-react'

const CustomLoader = ({ size, content }) => (
  <StyledLoader active size={size} content={content} />
)

export default CustomLoader

const StyledLoader = styled(Loader)`
  &&& {
    :after {
      border-color: ${props => `${props.theme.green4} transparent transparent`};
    }
  }
`
