import React from 'react'
import styled from 'styled-components'
import { animated, Spring } from 'react-spring/renderprops'

const start = {
  opacity: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const TwoWords = ({ words }) => {
  return (
    <>
      <Spring delay={1500} from={start} to={{ opacity: 1, left: '25%' }}>
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[0].concept_label}
          </Word>
        )}
      </Spring>
      <Spring delay={1600} from={start} to={{ opacity: 1, left: '75%' }}>
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[1].concept_label}
          </Word>
        )}
      </Spring>
    </>
  )
}

export default TwoWords

const Word = styled(animated.div)`
  position: absolute;
  font-size: 16px;
  font-weight: bolder;
`
