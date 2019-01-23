import React, { Component } from 'react'
import { BoldText, GridContainer, PageHeader, SearchForm } from '../components'
// import SearchForm from '../containers/SearchForm'

class SearchPage extends Component {
  render() {
    return (
      <GridContainer rows={'85px 6% 1fr'} gap={true} center={true}>
        <PageHeader>
          <h1>Alla jobb på ett ställe</h1>
        </PageHeader>

        <p>
          <BoldText>294 293</BoldText> jobb från <BoldText>1009</BoldText>{' '}
          jobbsajter
        </p>

        <SearchForm upward={true} />
      </GridContainer>
    )
  }
}

export default SearchPage
