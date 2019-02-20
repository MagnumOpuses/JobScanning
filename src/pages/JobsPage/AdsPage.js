import React from 'react'
import Responsive from 'react-responsive'
import breakpoint from '../../styles/breakpoints'
import DesktopJobsPage from './components/DesktopJobsPage'
import MobileJobsPage from './components/MobileJobsPage'

const AdsPage = () => {
  return (
    <>
      <Responsive maxWidth={breakpoint.tabletLandscape}>
        <MobileJobsPage />
      </Responsive>
      <Responsive minWidth={1025}>
        <DesktopJobsPage />
      </Responsive>
    </>
  )
}

export default AdsPage
