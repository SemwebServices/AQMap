import React, {Component} from 'react'

// https://react-md.mlaursen.com/getting-started/installation
// import { NavigationDrawer, Button, FontIcon } from 'react-md';
import { Grid, Cell } from 'react-md';

import './index.css'


export default class extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      detail_visible:false,
      map_cell_size:10,
      detail_cell_size:0
    };

    this.showDetail = this.showDetail.bind(this);
  }

  showDetail = () => {
    const { detail_visible } = this.state;
    if (detail_visible) {
      this.setState( { detail_visible : false, map_cell_size:10, selectedSensor:0 } );
    }
    else {
      this.setState( { detail_visible : true, map_cell_size:5, detail_cell_size:5, selectedSensor:{id:1} } );
    }
  }

  render() {
    return <div style={{"flex" :"1", "border":"1px solid red"}}>
      <h2>Welcome to AQ Map component</h2>
      <button onClick={this.showDetail}>Toggle</button>
      <Grid style={{"flex" :"1"}}>
        <Cell size={2}>
          <FacetPanel/>
        </Cell>
        <Cell size={this.state.map_cell_size}>
          <MainMapPanel/>
        </Cell>
        { this.state.detail_visible ? <Cell size={this.state.detail_cell_size}> <SensorDetailPanel sensor={this.state.selectedSensor} /> </Cell> : null }
      </Grid>
    </div>
  }

  // Methods
  // toggleFacet
  // selectSensor - Toggle sizes
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
      <div>
        <div>Main Map Panel</div>
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      </div>
    )
  } 
} 


class SensorDetailPanel extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <div>Sensor Detail Panel {this.props.sensor.id}</div>
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      </div>
    )
  } 
} 

