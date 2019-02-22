import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextEnrichment from './TextEnrichment'

class TextEnrichmentContainer extends Component {
  state = {
    skills: this.props.selectedJob.detected_keywords.skills,
    traits: this.props.selectedJob.detected_keywords.traits
  }

  componentDidUpdate() {
    if (
      this.state.skills[0] !==
        this.props.selectedJob.detected_keywords.skills[0] ||
      this.state.traits[0] !==
        this.props.selectedJob.detected_keywords.traits[0]
    ) {
      this.setState({
        skills: this.props.selectedJob.detected_keywords.skills,
        traits: this.props.selectedJob.detected_keywords.traits
      })
    }
  }

  render() {
    const { selectedJob, mobile } = this.props
    const {
      detected_keywords: { skills, traits }
    } = selectedJob

    return (
      <>
        {skills.length > 0 && (
          <TextEnrichment
            header="Eftertraktade kompetenser"
            list={this.state.skills.slice(0, 4)}
            icon="briefcase"
            mobile={mobile}
          />
        )}
        {traits.length > 0 && (
          <TextEnrichment
            header="Eftertraktade förmågor"
            list={this.state.traits.slice(0, 4)}
            icon="user"
            mobile={mobile}
          />
        )}
      </>
    )
  }
}

function mapStateToProps({ ads }) {
  const { selectedJob } = ads

  return {
    selectedJob
  }
}

export default connect(
  mapStateToProps,
  null
)(TextEnrichmentContainer)
