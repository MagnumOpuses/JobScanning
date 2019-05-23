import React from 'react';
import { connect } from 'react-redux';
import {
  setSearchTerm,
  setLocation,
  fetchJobs
} from '../../redux/actions/index';
import { withRouter } from 'react-router-dom';
import { countiesAndMunicipalities } from '../../utils/searchOptions';
import SearchForm from './SearchForm';

class SearchFormContainer extends React.Component {
  handleChange = (event, data) => {
    const { setSearchTerm, setLocation } = this.props;

    console.log(data);

    if (data.name === 'searchTerm') {
      setSearchTerm(data.value);
    } else if (data.name === 'location') {
      setLocation(data.value);
    }
  };

  handleSubmit = event => {
    const { searchTerm, location, fetchJobs, history } = this.props;

    event.preventDefault();
    fetchJobs(searchTerm, location);
    history.push('/jobs');
  };

  render() {
    const {
      searchTerm,
      location,
      upward,
      isDesktop,
      togglable,
      showForm
    } = this.props;

    return (
      <SearchForm
        searchTerm={searchTerm}
        location={location.value}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        countiesAndMunicipalities={countiesAndMunicipalities}
        upward={upward}
        isDesktop={isDesktop}
        togglable={togglable}
        showForm={showForm}
      />
    );
  }
}

function mapStateToProps({ ads }) {
  const { searchTerm, location } = ads;

  return {
    searchTerm,
    location
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { setSearchTerm, setLocation, fetchJobs }
  )(SearchFormContainer)
);
