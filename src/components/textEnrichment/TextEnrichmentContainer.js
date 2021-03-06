import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextEnrichment from './TextEnrichment';

class TextEnrichmentContainer extends Component {
  render() {
    const { selectedJob } = this.props;
    const {
      detected_keywords: { skills, traits }
    } = selectedJob;

    return (
      <>
        {skills.length > 0 && (
          <TextEnrichment
            header="Eftertraktade kompetenser"
            list={skills.slice(0, 10)}
            icon="briefcase"
            margin="0 5px 0 0"
          />
        )}
        {traits.length > 0 && (
          <TextEnrichment
            header="Eftertraktade förmågor"
            list={traits.slice(0, 10)}
            icon="user"
            margin="0 0 0 5px"
          />
        )}
      </>
    );
  }
}

function mapStateToProps({ ads }) {
  const { selectedJob } = ads;

  return {
    selectedJob
  };
}

export default connect(
  mapStateToProps,
  null
)(TextEnrichmentContainer);
