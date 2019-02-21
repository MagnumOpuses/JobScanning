import React from 'react'
import styled from 'styled-components'
import images from '../images'

const getLogo = name => {
  if ([name] in images) {
    return <BrandImage src={images[name]} alt={name} />
  } else {
    return (
      <BrandText>
        <p>{name}</p>
      </BrandText>
    )
  }
}

export default getLogo

const BrandImage = styled.div`
  height: 100%;
  background: ${props => `url(${props.src})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 5rem;
  flex: 0 0 176px;
  margin-right: 6rem;
`

const BrandText = styled.div`
  text-align: center;
  line-height: 2.3rem;
  flex: 0 0 176px;
  margin-right: 6rem;
`
