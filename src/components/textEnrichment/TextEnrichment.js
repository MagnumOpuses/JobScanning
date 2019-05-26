import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import breakpoints from '../../styles/breakpoints';

const TextEnrichment = ({ header, icon, list, margin }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Container isExpanded={isExpanded} listHeight={list.length} margin={margin}>
      <Icon style={{ margin: '0' }} name={icon} size="big" color="black" />
      <p className="header">{header}</p>
      <ul className="list">
        {list.map((word, i) => {
          return (
            <li className="list-item" key={i}>
              {word}
            </li>
          );
        })}
      </ul>
      {list.length > 4 && (
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ width: '100%', textAlign: 'center', cursor: 'pointer' }}
        >
          <div
            style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '5px',
              transform: isExpanded ? 'rotate(-135deg)' : 'rotate(45deg)'
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default TextEnrichment;

const Container = styled.div`
  flex: 0 1 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  margin: ${({ margin }) => margin};

  @media (max-width: ${breakpoints.tablet}) {
    margin: 0;
  }

  .header {
    font-weight: bold;
  }

  .list {
    transition: max-height 0.3s ease;
    max-height: ${({ isExpanded, listHeight }) =>
      isExpanded ? '192px' : '64px'};
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;

    @media (max-width: ${breakpoints.tablet}) {
      max-height: ${({ isExpanded, listHeight }) =>
        isExpanded ? listHeight * 32 + 'px' : '64px'};
    }
  }

  .list-item {
    flex: 1 0 50%;
    text-transform: capitalize;
    font-size: 16px;
    text-align: left;
    padding: 5px 0;

    @media (max-width: ${breakpoints.tablet}) {
      flex: 1 0 100%;
    }
  }
`;
