import React from 'react'
import styled from 'styled-components'
import { animated, Spring } from 'react-spring/renderprops'

const start = {
  opacity: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const OneWord = ({ words }) => {
  return (
    <Spring delay={1500} from={start} to={{ opacity: 1, top: '10%' }}>
      {({ opacity, top, left, transform }) => (
        <Word style={{ opacity, top, left, transform }}>
          {words[0].concept_label}
        </Word>
      )}
    </Spring>
  )
}

export default OneWord

const Word = styled(animated.div)`
  position: absolute;
  font-size: 16px;
  font-weight: bolder;
`
