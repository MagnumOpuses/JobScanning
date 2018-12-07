import { css } from 'styled-components'

export const buttonStyle = css`
  color: ${props => props.theme.white};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  background: ${props => props.theme.secondary};
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
  border: 1px solid ${props => props.theme.secondary};
  border-radius: 10rem;
  transition: 0.1s all ease;

  &:hover {
    color: ${props => props.theme.secondary};
    background: ${props => props.theme.white};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    border: 1px solid ${props => props.theme.secondary};
  }

  &:active,
  &:focus {
    box-shadow: 0 0.15rem 0.25rem rgba(0, 0, 0, 0.5);
  }

  &:disabled {
    color: ${props => props.theme.lightGrey};
    background: ${props => props.theme.brightestSecondary};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2) !important;
    border: 1px solid ${props => props.theme.brightestSecondary};
    opacity: 1 !important;
  }
`
