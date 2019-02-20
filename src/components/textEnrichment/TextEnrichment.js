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

const TextEnrichment = ({ header, icon, list, mobile }) => {
  if (mobile) {
    return (
      <Spring native from={{ height: 0 }} to={{ height: 200 }}>
        {({ height }) => (
          <Container
            style={{
              height,
              overflow: 'hidden'
            }}
          >
            <p style={{ textAlign: 'center' }}>{header}</p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Spring delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
                {({ opacity }) => (
                  <Icon
                    style={{ opacity, margin: '0 1rem 0 0' }}
                    name={icon}
                    size="big"
                    color="black"
                  />
                )}
              </Spring>

              <List>
                {list.map((word, i) => {
                  return (
                    <Spring
                      native
                      delay={2000 + 300 * i}
                      from={{
                        opacity: 0
                      }}
                      to={{
                        opacity: 1
                      }}
                      key={word.concept_label}
                    >
                      {({ opacity }) => (
                        <ListItem style={{ opacity }}>
                          {word.concept_label}
                        </ListItem>
                      )}
                    </Spring>
                  )
                })}
              </List>
            </div>
          </Container>
        )}
      </Spring>
    )
  }

  return (
    <Spring native from={{ height: 0 }} to={{ height: 200 }}>
      {({ height }) => (
        <Container style={{ height, width: '400px' }}>
          <p style={{ textAlign: 'center' }}>{header}</p>
          <div style={{ height: '100%', position: 'relative' }}>
            <Spring delay={1000} from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {({ opacity }) => (
                <StyledIcon
                  style={{ opacity }}
                  name={icon}
                  size="big"
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
  position: relative;
`

const StyledIcon = styled(Icon)`
  margin: 0 0 0 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled(animated.li)`
  padding: 5px;
  font-size: 16px;
  font-weight: bolder;
`
