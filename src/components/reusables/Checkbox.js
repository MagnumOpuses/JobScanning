import React from 'react'
import styled from 'styled-components'
import breakpoint from '../../styles/breakpoints'

const Checkbox = ({ label, onChange }) => (
  <StyledCheckbox>
    {label}
    <div>
      <input type="checkbox" onChange={onChange} />
      <Checkmark />
    </div>
  </StyledCheckbox>
)

export default Checkbox

const StyledCheckbox = styled.label`
  &&& {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    div {
      display: inherit;
      position: relative;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
    }
  }
`

const Checkmark = styled.span`
  height: 30px;
  width: 30px;
  background-color: #fff;
  border: 1px solid #d4d4d5;
  position: relative;

  input:checked ~ &:after {
    display: block;
  }

  :after {
    content: '';
    display: none;
    width: 12px;
    height: 24px;
    border: solid ${props => props.theme.secondary};
    border-width: 0 6px 6px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    left: 8px;
  }

  @media (min-width: ${breakpoint.tablet}) {
    margin-left: 1rem;
  }
`
