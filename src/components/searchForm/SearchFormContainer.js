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

    if (data.name === 'searchTerm') {
      setSearchTerm(data.value);
    } else if (data.name === 'location') {
      setLocation(data.value);
    }
  };

  handleSubmit = event => {
    const {
      searchTerm,
      location,
      fetchJobs,
      history,
      setShowForm
    } = this.props;

    event.preventDefault();
    if (setShowForm) {
      setShowForm(false);
    }
    fetchJobs(searchTerm, location);
    history.push(
      `/jobs/${searchTerm.toLowerCase()}/${
        location.value ? location.value : ' '
      }`
    );
  };

  render() {
    const { searchTerm, location, upward, isDesktop } = this.props;

    return (
      <SearchForm
        searchTerm={searchTerm}
        location={location.value}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        countiesAndMunicipalities={countiesAndMunicipalities}
        upward={upward}
        isDesktop={isDesktop}
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
