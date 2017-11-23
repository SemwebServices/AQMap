import React, {Component} from 'react'

// https://react-md.mlaursen.com/getting-started/installation
// import { NavigationDrawer, Button, FontIcon } from 'react-md';
import { Grid, Cell } from 'react-md';


export default class extends Component {
  render() {
    return <div>
      <h2>Welcome to AQ Map component</h2>
      <Grid>
        <Cell size={2}>
          <FacetPanel/>
        </Cell>
        <Cell size={5}>
          <MainMapPanel/>
        </Cell>
        <Cell size={5}>
          <SensorDetailPanel/>
        </Cell>
      </Grid>
    </div>
  }

  // Methods
  // toggleFacet
  // selectSesor
}


// Class FacetPanel, MainMapPanel, SensorDetailPanel

class FacetPanel extends Component {
  render() {
    return (
      <div>Facet Panel 2</div>
    )
  }
}

class MainMapPanel extends Component {
  render() {
    return (
      <div>Main Map Panel</div>
    )
  } 
} 


class SensorDetailPanel extends Component {
  render() {
    return (
      <div>Facet Panel</div>
    )
  } 
} 

