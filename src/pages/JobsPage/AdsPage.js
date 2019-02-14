import React, { Component } from 'react'
import Responsive from 'react-responsive'
import breakpoint from '../../styles/breakpoints'
import DesktopJobsPage from './components/desktop/DesktopJobsPage'
import MobileJobsPage from './components/MobileJobsPage'

const AdsPage = () => {
  return (
    <React.Fragment>
      <Responsive maxWidth={breakpoint.tablet}>
        <MobileJobsPage />
      </Responsive>
      <Responsive minWidth={769}>
        <DesktopJobsPage />
      </Responsive>
    </React.Fragment>
  )
}

export default AdsPage
