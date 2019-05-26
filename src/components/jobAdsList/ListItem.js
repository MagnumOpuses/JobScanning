import React, { Component } from 'react';
import styled from 'styled-components';
import { LogoPlaceholder } from '../index';

export default class ListItemComponent extends Component {
  state = { new: true };

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ new: false });
    }, 2000);
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <ListItem
        onClick={() => {
          this.props.selectOrUnselectJob(this.props.item);
        }}
        selected={this.props.item.id === this.props.selectedJob.id}
        new={this.state.new}
      >
        {this.props.item.employer && (
          <LogoPlaceholder employer={this.props.item.employer} />
        )}
        <div style={{ flex: '1', fontSize: '18px' }}>
          <ItemTitle>{this.props.item.header}</ItemTitle>
          <P>
            {this.props.item.employer.name ? this.props.item.employer.name : ''}
            {this.props.item.employer.name && this.props.item.location ? (
              <span> &bull; </span>
            ) : (
              ' '
            )}
            {this.props.item.location ? this.props.item.location : ''}
          </P>
        </div>
      </ListItem>
    );
  }
}

const ListItem = styled.li`
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  border-bottom: 2px solid hsl(120, 23%, 95%);
  background: ${props =>
    props.new
      ? '#a6f3ed'
      : props.selected
      ? '#fff linear-gradient(165deg, rgba(255, 255, 255, 0) 70%, #50e8db 100%)'
      : '#fff'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 3px #50e8db;
  }
`;

const ItemTitle = styled.h3`
  font-size: 18px;
`;

const P = styled.p`
  font-size: 18px;
`;
