import React, {Component} from 'react'

// https://react-md.mlaursen.com/getting-started/installation
// import { NavigationDrawer, Button, FontIcon } from 'react-md';
import { Grid, Cell } from 'react-md';

import './index.css'

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"



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
    //google.maps.event.trigger(map, "resize");
  }

  render() {
    return <div style={{"flex" :"1"}} >
        <Grid style={{"height":"100%"}}>
          <Cell size={2}>
            <FacetPanel/>
            <button onClick={this.showDetail}>Toggle</button>
          </Cell>
          <Cell size={this.state.map_cell_size}>
            <MainMapPanel  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                           loadingElement={<div style={{ }} />}
                           containerElement={<div style={{ "flex":"1", "height":"95%" }} />}
                           mapElement={<div style={{ height: '100%', flex:'1' }} />} />
          </Cell>
          { this.state.detail_visible ? <Cell size={this.state.detail_cell_size}> <SensorDetailPanel sensor={this.state.selectedSensor} /> </Cell> : null }
        </Grid>
        &nbsp; <br/>
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


const MainMapPanel = withScriptjs(withGoogleMap((props) =>
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }} >
  </GoogleMap>
))

// class MainMapPanel extends Component {
//   render() {
//     return (
//       <div>
//         <GoogleMap defaultZoom={8}
//                    defaultCenter={{ lat: -34.397, lng: 150.644 }} >
//         </GoogleMap>
//       </div>
//     )
//   } 
// } 


class SensorDetailPanel extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
      <div>Sensor Detail Panel {this.props.sensor ? this.props.sensor.id : ''}</div>
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      This is sensor detail panel with enough text to cause a wrap around I really hope so I can see if the content pushes to the end of the grid...
      </div>
    )
  } 
} 

