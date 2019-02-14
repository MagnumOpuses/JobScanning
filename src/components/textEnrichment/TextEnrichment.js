import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { animated, Spring } from 'react-spring/renderprops'
import OneWord from './animations/OneWord'
import TwoWords from './animations/TwoWords'
import ThreeWords from './animations/ThreeWords'
import FourWords from './animations/FourWords'
import Word from './animations/TestHooks'

function renderList(words) {
  if (words.length === 1) {
    return <Word word={words} />
  } else if (words.length === 2) {
    return <TwoWords words={words} />
  } else if (words.length === 3) {
    return <ThreeWords words={words} />
  } else if (words.length === 4) {
    return <FourWords words={words} />
  }
}

const TextEnrichment = ({ icon, list }) => {
  return (
    <Spring native from={{ height: 0 }} to={{ height: 200 }}>
      {({ height }) => (
        <Container style={{ height }}>
          <Spring delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
            {({ opacity }) => (
              <StyledIcon
                style={{ opacity }}
                name={icon}
                size="huge"
                color="black"
              />
            )}
          </Spring>

          {renderList(list)}
        </Container>
      )}
    </Spring>
  )
}

export default TextEnrichment

const Container = styled(animated.div)`
  height: 200px;
  width: 400px;
  position: relative;
  /* border: 1px solid #000; */
`

const StyledIcon = styled(Icon)`
  margin: 0 0 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
