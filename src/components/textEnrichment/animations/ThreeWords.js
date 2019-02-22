import React from 'react'
import styled from 'styled-components'
import { animated, Spring } from 'react-spring/renderprops'

const start = {
  opacity: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const ThreeWords = ({ words }) => {
  return (
    <>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '20%', left: '25%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>{words[0]}</Word>
        )}
      </Spring>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '20%', left: '75%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>{words[1]}</Word>
        )}
      </Spring>
      <Spring delay={1500} from={start} to={{ opacity: 1, top: '80%' }}>
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>{words[2]}</Word>
        )}
      </Spring>
    </>
  )
}

export default ThreeWords

const Word = styled(animated.div)`
  text-transform: capitalize;
  position: absolute;
  font-size: 16px;
  font-weight: bolder;
`
