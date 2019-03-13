import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const TextEnrichment = ({ header, icon, list }) => {
  return (
    <Container>
      <p style={{ textAlign: 'center' }}>{header}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <List>
          {list.slice(0, 5).map((word, i) => {
            return <ListItem key={i}>{word}</ListItem>
          })}
        </List>

        <Icon
          style={{ margin: '0 1rem 0 0' }}
          name={icon}
          size="big"
          color="black"
        />

        <List>
          {list.slice(5).map((word, i) => {
            return <ListItem key={i}>{word}</ListItem>
          })}
        </List>
      </div>
    </Container>
  )
}

export default TextEnrichment

const Container = styled.div`
  position: relative;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const ListItem = styled.li`
  text-transform: capitalize;
  padding: 5px;
  font-size: 16px;
  font-weight: bolder;
`
