import React from 'react'
import styled from 'styled-components'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import jt_logowhite from '../images/logo/2x/jt_logowhite@2x.png'
import homePageBackground from '../images/background.png'
import { diagonalSlide } from '../styles/animations/diagonalSlide'

export default () => {
  return (
    <Container>
      <Background />
      <Header>
        <h1>Alla jobb på ett ställe</h1>
        <Logo alt="JT" src={jt_logowhite} />
        <FlexContainer>
          <H2>
            <CountUp
              start={15000}
              end={294293}
              duration={8}
              separator=" "
              style={{ fontWeight: 'bold' }}
            />{' '}
            jobbannonser från
          </H2>
          <H2>
            <CountUp
              start={0}
              end={1009}
              duration={10}
              separator=" "
              style={{ fontWeight: 'bold' }}
            />{' '}
            webbplatser
          </H2>
        </FlexContainer>
        <StyledLink to="/search">Gå vidare</StyledLink>
      </Header>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`

const Background = styled.div`
  height: 3000px;
  width: 3000px;
  background: url('${homePageBackground}') repeat;
  background-position: right bottom;
  animation: ${diagonalSlide} 20s linear infinite;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  min-height: 55vh;
  text-align: center;
  padding: 2.5rem 0 4rem;
  background: ${props => props.theme.green4};
  border-bottom-left-radius: 90% 80%;
  border-bottom-right-radius: 90% 80%;
  box-shadow: 0 0.3rem 2rem 0.3rem rgba(0, 0, 0, 0.6);

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`

const Logo = styled.img`
  height: 20vh;
  width: auto;
  margin: 1rem 0 3rem 0;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledLink = styled(Link)`
  margin: 2rem 0 1rem 0;
  color: black;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  padding: 1.3rem 7rem;
  background: ${props => props.theme.primary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  border-radius: 10rem;
`

const H2 = styled.h2`
  font-weight: normal;
`
