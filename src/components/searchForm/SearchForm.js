import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Form, Icon, Input } from 'semantic-ui-react';
import breakpoint from '../../styles/breakpoints';

const SearchForm = ({
  handleSubmit,
  countiesAndMunicipalities,
  isDesktop,
  searchTerm,
  location,
  handleChange,
  upward,
  togglable,
  showForm
}) => {
  return (
    <>
      <CustomForm
        onSubmit={handleSubmit}
        className={`${isDesktop ? 'isDesktop' : ''} ${
          togglable ? (showForm ? 'show' : 'hide') : ''
        }`}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
          <Link to="/overview" style={{ color: '#49efe1' }}>
            <Icon name="line graph" size="large" />
            Se yrkesöversikt
          </Link>
        </div>

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
    </>
  );
};

export default SearchForm;

const StyledDropdown = styled(Dropdown)`
  & .visible {
    min-height: 30vh;
  }
`;

const CustomForm = styled(Form)`
  &&& {
    display: flex;
    flex-direction: column;
    width: 88%;
    margin: 0 auto;
    padding: 3rem 2rem;
    background: ${props => props.theme.green0};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    z-index: 1000;
    overflow: visible;
    height: auto;

    &&& * {
      font-size: 16px;
    }

    &&& > div {
      margin-top: 1rem;
    }

    &.show {
      @media (max-width: ${breakpoint.tablet}) {
        height: auto;
      }
    }

    &.hide {
      @media (max-width: ${breakpoint.tablet}) {
        overflow: hidden;
        max-height: 0;
      }
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
`;

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
`;
