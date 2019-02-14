import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

export default function SingleWord({ word }) {
  const props = useSpring({
    opacity: 1,
    top: '10%',
    from: {
      opacity: 0,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    delay: 1500
  })
  return <Word style={props}>{word}</Word>
}

const Word = styled(animated.div)`
  position: absolute;
  font-size: 16px;
  font-weight: bolder;
  left: 50%;
  transform: translate(-50%, -50%);
`
