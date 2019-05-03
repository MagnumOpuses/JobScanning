import React, { Component } from 'react'
import styled from 'styled-components'

export default class Text extends Component {
  state = { expanded: true }

  componentWillUnmount() {
    this.setState({ expanded: true })
  }

  render() {
    return (
      <Container expanded={this.state.expanded}>
        <h3 style={{ fontSize: '2.4rem', marginBottom: '15px' }}>Annons</h3>
        {this.props.text && (
          <p className="text">
            {this.props.text
              .replace(/\n/g, '\n\n')
              .substring(0, this.props.characters)}
          </p>
        )}
        <button
          onClick={() =>
            this.setState(prevState => ({ expanded: !prevState.expanded }))
          }
        >
          Visa mer
          {this.state.expanded ? 'true' : 'false'}
        </button>
      </Container>
    )
  }
}

const Container = styled.div`
  overflow: hidden;

  .text {
    transition: all 2s;
    max-height: ${props => (props.expanded ? '500px' : '200px')};
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
  }
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
