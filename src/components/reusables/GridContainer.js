import React from 'react'
import styled from 'styled-components'

const GridContainer = ({
  height,
  width,
  margin,
  rows,
  columns,
  gap,
  center,
  children
}) => (
  <Grid
    height={height}
    width={width}
    margin={margin}
    rows={rows}
    columns={columns}
    gap={gap}
    center={center}
  >
    {children}
  </Grid>
)

export default GridContainer

const Grid = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
  margin: ${props => props.margin};
  display: grid;
  grid-template-rows: ${props => props.rows};
  grid-template-columns: ${props => (props.columns ? props.columns : 'auto')};
  grid-gap: ${props => (props.gap ? '2rem' : '0')};
  justify-items: ${props => (props.center ? 'center' : 'stretch')};
`
