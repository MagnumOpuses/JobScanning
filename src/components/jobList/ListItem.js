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
    const { selectOrUnselectJob, job, selectedJob } = this.props;

    return (
      <ListItem
        onClick={() => {
          selectOrUnselectJob(job);
        }}
        selected={job.id === selectedJob.id}
        new={this.state.new}
      >
        {job.employer && <LogoPlaceholder employer={job.employer} />}
        <div style={{ flex: '1', fontSize: '18px' }}>
          <ItemTitle>{job.header}</ItemTitle>
          <P>
            {job.employer.name ? job.employer.name : ''}
            {job.employer.name && job.location ? <span> &bull; </span> : ' '}
            {job.location ? job.location : ''}
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
  word-break: break-word;
`;

const P = styled.p`
  font-size: 18px;
`;
