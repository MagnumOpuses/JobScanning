import React from 'react'
import styled from 'styled-components'
import images from '../../images'
import { buttonStyleCorners } from '../../styles/components'
import breakpoints from '../../styles/breakpoints'

const DescriptionContainer = ({ text, characters, sources }) => (
  <DescriptionBox>
    <h3 style={{ fontSize: '2.4rem', marginBottom: '15px' }}>Annons</h3>
    {text && (
      <DescriptionText>
        {text.replace(/\n/g, '\n\n').substring(0, characters)}
      </DescriptionText>
    )}
    {sources.length > 1 ? (
      <MultipleLinks>
        <p>Vi hittade annonsen på {sources.length} olika sajter</p>
        <p>Välj vilken du vill gå till!</p>
        <SourcesContainer>
          {sources.map((source, i) => (
            <A
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {[source.name] in images ? (
                <SourceLogo sourceLogo={images[source.name]} />
              ) : (
                <p>{source.name}</p>
              )}
            </A>
          ))}
        </SourcesContainer>
      </MultipleLinks>
    ) : (
      <StyledLink
        href={sources[0].url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Gå till annonsen
      </StyledLink>
    )}
  </DescriptionBox>
)

export default DescriptionContainer

const DescriptionBox = styled.div`
  position: relative;
`

const DescriptionText = styled.p`
  max-width: 740px;
  font-size: 20px;
  line-height: 27px;
  white-space: pre-line;
  background: -webkit-linear-gradient(
    #000 0%,
    #eee 75%,
    rgba(255, 255, 255, 0)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
`

const MultipleLinks = styled.div`
  position: absolute;
  left: 50%;
  bottom: 35%;
  transform: translate(-50%, 65%);
  width: 70%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
  padding: 1rem;

  @media screen and (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

const SourcesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

const A = styled.a`
  flex: 1 1 45%;
  max-width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.5%;
`

const SourceLogo = styled.div`
  height: 12rem;
  width: 100%;
  background: ${props => `url(${props.sourceLogo})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

const StyledLink = styled.a`
  ${buttonStyleCorners}
  &:link,
  &:visited {
    width: 60%;
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translate(-50%, -15%);
    padding: 1.5rem;
  }
`
