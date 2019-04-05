import React from 'react'
import Responsive from 'react-responsive'
import breakpoint from '../../styles/breakpoints'
import DesktopJobsPage from './desktop/DesktopJobsPage'
import MobileJobsPage from './components/MobileJobsPage'

const AdsPage = () => {
  return (
    <>
      <Responsive maxWidth={breakpoint.tablet}>
        <MobileJobsPage />
      </Responsive>
      <Responsive minWidth={1025}>
        <DesktopJobsPage />
      </Responsive>
    </>
  )
}

export default AdsPage
