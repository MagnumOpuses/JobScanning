import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'
import { animated, Transition } from 'react-spring/renderprops'

function setTransform(i) {
  if (i === 0) {
    return 'translate(-100px, -80px)'
  } else if (i === 1) {
    return 'translate(100px, -80px)'
  } else if (i === 2) {
    return 'translate(100px, 80px)'
  } else if (i === 3) {
    return 'translate(-100px, 80px)'
  }
}

const TextEnrichment = ({ competencies, traits }) => {
  console.log(competencies)
  return (
    <>
      <CompetenciesContainer>
        {competencies.map((competence, i) => {
          return (
            <Transition
              config={{ duration: 500 }}
              items={competence}
              from={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
              enter={{
                transform: setTransform(i)
              }}
              leave={{ opacity: 0 }}
            >
              {competence =>
                competence &&
                (props => <Item style={props}>{competence.concept_label}</Item>)
              }
            </Transition>
          )
        })}

        <Icon name="briefcase" size="huge" />
      </CompetenciesContainer>

      <TraitsContainer>
        {traits.map((trait, i) => {
          return (
            <Transition
              config={{ duration: 500 }}
              items={trait}
              from={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
              enter={{
                transform: setTransform(i)
              }}
              leave={{ opacity: 0 }}
            >
              {trait =>
                trait &&
                (props => <Item style={props}>{trait.concept_label}</Item>)
              }
            </Transition>
          )
        })}

        <Icon name="user outline" size="huge" />
      </TraitsContainer>
    </>
  )
}

export default TextEnrichment

const CompetenciesContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`

const TraitsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`

const Item = styled(animated.li)`
  display: flex;
  width: max-content;
  list-style: none;
  padding: 10px;
  backface-visibility: hidden;
  font-weight: bolder;
`
