import React from 'react'
import styled from 'styled-components'
import { animated, Spring } from 'react-spring/renderprops'

const start = {
  opacity: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
}

const FourWords = ({ words }) => {
  return (
    <>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '20%', left: '25%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[0].concept_label}
            {/* {parseFloat(words[0].prediction * 100).toFixed(0)}% */}
          </Word>
        )}
      </Spring>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '20%', left: '75%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[1].concept_label}
            {/* {parseFloat(words[1].prediction * 100).toFixed(0)}% */}
          </Word>
        )}
      </Spring>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '80%', left: '75%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[2].concept_label}
            {/* {parseFloat(words[2].prediction * 100).toFixed(0)}% */}
          </Word>
        )}
      </Spring>
      <Spring
        delay={1500}
        from={start}
        to={{ opacity: 1, top: '80%', left: '25%' }}
      >
        {({ opacity, top, left, transform }) => (
          <Word style={{ opacity, top, left, transform }}>
            {words[3].concept_label}
            {/* {parseFloat(words[3].prediction * 100).toFixed(0)}% */}
          </Word>
        )}
      </Spring>
    </>
  )
}

export default FourWords

const Word = styled(animated.div)`
  position: absolute;
  font-size: 16px;
  font-weight: bolder;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); */
  /* padding: 1rem 1rem 2rem; */
`
