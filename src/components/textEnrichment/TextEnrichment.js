import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { animated, Spring } from 'react-spring/renderprops'
import OneWord from './animations/OneWord'
import TwoWords from './animations/TwoWords'
import ThreeWords from './animations/ThreeWords'
import FourWords from './animations/FourWords'

function renderList(list) {
  if (list.length === 1) {
    return <OneWord words={list} />
  } else if (list.length === 2) {
    return <TwoWords words={list} />
  } else if (list.length === 3) {
    return <ThreeWords words={list} />
  } else if (list.length >= 4) {
    return <FourWords words={list} />
  }
}

const TextEnrichment = ({ header, icon, list }) => {
  return (
    <Spring native from={{ height: 0 }} to={{ height: 200 }}>
      {({ height }) => (
        <Container style={{ height }}>
          <p style={{ textAlign: 'center' }}>{header}</p>
          <div style={{ height: '100%', position: 'relative' }}>
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
          </div>
        </Container>
      )}
    </Spring>
  )
}

export default TextEnrichment

const Container = styled(animated.div)`
  /* height: 200px; */
  width: 400px;
  position: relative;
`

const StyledIcon = styled(Icon)`
  margin: 0 0 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
