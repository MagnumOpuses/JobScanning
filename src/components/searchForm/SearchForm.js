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
  upward
}) => {
  return (
    <CustomForm
      onSubmit={handleSubmit}
      className={isDesktop ? 'isDesktop' : ''}
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
        <Link to={`/overview/${searchTerm}`} style={{ color: '#49efe1' }}>
          {/* <Button
            content="Yrkesöversikt"
            basic
            color="teal"
            disabled={searchTerm.length > 0 ? false : true}
          /> */}
          <SVGBackArrow height="40" width="255">
            <polygon
              points="0,0 255,0 255,40 0,40"
              fill="#fff"
              stroke="#49efe1"
              strokeWidth="3"
            />
            <text x="25" y="28">
              Yrkesöversikt
            </text>
          </SVGBackArrow>
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
  );
};

export default SearchForm;

const SVGBackArrow = styled.svg`
  margin: 20px 0;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));

  &:hover {
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2));
  }

  text {
    font-size: 20px;
  }
`;

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
    margin: 20px auto;
    padding: 3rem 2rem;
    background: ${props => props.theme.green0};
    box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    z-index: 1000;
    overflow: visible;
    height: auto;

    &&& * {
      font-size: 20px;
    }

    &&& > div {
      margin-top: 1rem;
    }

    @media (min-width: ${breakpoint.tablet}) {
      flex-direction: row;
      justify-content: center;
      height: min-content;
      width: auto;
      margin: 0 auto;

      &&& * {
        font-size: 16px;
      }

      & > div {
        margin-right: 1rem;
      }
    }
  }
`;

const CustomButton = styled(Button)`
  &&& {
    align-self: center;
    margin-top: 4rem;
    padding: 1.4rem 9rem;
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

    @media (min-width: ${breakpoint.tablet}) {
      margin-top: 0;
    }
  }
`;
