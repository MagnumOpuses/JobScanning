import React from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const TextEnrichment = ({ header, icon, list }) => {
  return (
    <Container>
      <Icon style={{ margin: '0' }} name={icon} size="big" color="black" />
      <p className="header">{header}</p>
      <ul className="list">
        {list.map((word, i) => {
          return (
            <li className="list-item" key={i}>
              {word}
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

{
  /* <Container>
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
</Container> */
}

export default TextEnrichment

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  /* text-align: center; */

  .header {
    font-weight: bold;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }

  .list-item {
    flex: 1 0 50%;
    text-transform: capitalize;
    font-size: 16px;
    text-align: left;
    padding: 5px 0;
  }
`

// const Container = styled.div`
//   position: relative;
// `

// const List = styled.ul`
//   margin: 0;
//   padding: 0;
//   list-style: none;
// `

// const ListItem = styled.li`
//   text-transform: capitalize;
//   padding: 5px;
//   font-size: 16px;
//   font-weight: bolder;
// `
