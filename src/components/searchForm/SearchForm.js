import React from 'react'
import styled from 'styled-components'
import { Button, Dropdown, Form, Input } from 'semantic-ui-react'
import { Checkbox } from '../../components'
import breakpoint from '../../styles/breakpoints'

const SearchForm = ({
  handleSubmit,
  countiesAndMunicipalities,
  isDesktop,
  searchTerm,
  location,
  handleChange,
  upward,
  getCurrentPosition
}) => {
  return (
    <CustomForm onSubmit={handleSubmit} className={isDesktop && 'isDesktop'}>
      <Form.Field required={true}>
        <Input
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          size="big"
          icon="search"
          iconPosition="left"
          placeholder="Skriv sökord"
          required
        />
      </Form.Field>

      <div style={{ overflow: 'visible' }}>
        <Form.Field>
          <StyledDropdown
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Ange plats"
            search
            selection
            options={countiesAndMunicipalities}
            upward={upward}
          />
        </Form.Field>

        {/* <Checkbox
          label="Använd min nuvarande position"
          onChange={getCurrentPosition}
        /> */}
      </div>

      <div style={{ textAlign: 'center' }}>
        <CustomButton
          type="submit"
          disabled={searchTerm.length > 0 ? false : true}
        >
          Sök
        </CustomButton>
      </div>
    </CustomForm>
  )
}

export default SearchForm

const StyledDropdown = styled(Dropdown)`
  & .visible {
    min-height: 30vh;
  }
`

const CustomForm = styled(Form)`
  &&& {
    display: flex;
    flex-direction: column;
    height: 350px;
    width: 88%;
    padding: 3rem 2rem;
    background: ${props => props.theme.green0};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    z-index: 1000;
    overflow: visible;

    &&& * {
      font-size: 16px;
    }

    &&& > div {
      margin-top: 1rem;
    }

    @media (min-width: ${breakpoint.tablet}) {
      flex-direction: row;
      justify-content: center;
      height: min-content;
      width: auto;

      & > div {
        margin-right: 1rem;
      }
    }
  }
`

const CustomButton = styled(Button)`
  &&& {
    color: rgba(0, 0, 0, 7);
    background: ${props => props.theme.green4};

    &&&:disabled {
      color: rgba(0, 0, 0, 0.66);
      background: ${props => props.theme.green3};
      box-shadow: none;
      cursor: not-allowed;
      pointer-events: all !important;
    }

    &:hover {
      background: ${props => props.theme.green5};
    }

    align-self: center;
    margin-top: 4rem;
    padding: 1.4rem 9rem;

    @media (min-width: ${breakpoint.tablet}) {
      margin-top: 0;
    }
  }
`
