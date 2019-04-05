import React, { Component } from 'react'
import styled from 'styled-components'
import { LogoPlaceholder } from '../index'

export default class ListItemComponent extends Component {
  state = { class: 'new' }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ class: 'seen' })
    }, 5000)
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <li
        onClick={() => {
          this.props.selectAd(this.props.item)
        }}
        className={`JobAdsList__ListItem ${
          this.props.item.id === this.props.selectedJob.id
            ? 'selected'
            : this.state.class
        }`}
      >
        <ItemInfo>
          <LogoPlaceholder employer={this.props.item.employer} />
          <div style={{ flex: '1', fontSize: '18px' }}>
            <ItemTitle>{this.props.item.header}</ItemTitle>
            <P>
              {this.props.item.employer.name
                ? this.props.item.employer.name
                : ''}
              {this.props.item.employer.name && this.props.item.location ? (
                <span> &bull; </span>
              ) : (
                ' '
              )}
              {this.props.item.location ? this.props.item.location : ''}
            </P>
          </div>
        </ItemInfo>
      </li>
    )
  }
}

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
`

const ItemTitle = styled.h3`
  font-size: 18px;
`

const P = styled.p`
  font-size: 18px;
`
