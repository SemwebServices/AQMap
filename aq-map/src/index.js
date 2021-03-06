import React, {Component} from 'react'
// https://react-md.mlaursen.com/getting-started/installation
// import { NavigationDrawer, Button, FontIcon } from 'react-md';
import { Grid, Cell } from 'react-md';
import './index.css'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import axios from 'axios';

//
// Some sparql examples here
// https://github.com/BetterWithDataSociety/OpenDataKiosk/blob/dev/AirMap2/partial/AirMap2/AirMap2.js
//
// for ( var i = 0; i < data.results.bindings.length; i++ ) {
//   var p = new ol.geom.Point(ol.proj.transform([parseFloat(data.results.bindings[i].lon.value), 
//   parseFloat(data.results.bindings[i].lat.value)], 'EPSG:4326', 'EPSG:900913'));
//
//   var f = new ol.Feature({geometry:p,
//   type : 'RTMonitoring',
//   uri : data.results.bindings[i].s.value,
//   label : data.results.bindings[i].id.value});
//   f.setStyle(rtStyle);
//   mkrs.addFeatures([f]);
//  }


export default class extends Component {

  constructor( props ) {
    super( props );

    this.state = {
      detail_visible:true,
      map_cell_size:5,
      detail_cell_size:5
    };

    this.showDetail = this.showDetail.bind(this);
    this.selectSensor = this.selectSensor.bind(this);
  }

  componentDidMount() {
    axios.get('http://demo.semweb.co/sparql?default-graph-uri=&query=select+%3Fs+%3Flat+%3Flon+%3Fid+where+%7B%0D%0A++%3Fs+a+%3Chttp%3A%2F%2Fpurl.oclc.org%2FNET%2Fssnx%2Fssn%23SensingDevice%3E+.%0D%0A++%3Fs+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23lat%3E+%3Flat+.%0D%0A++%3Fs+%3Chttp%3A%2F%2Fwww.w3.org%2F2003%2F01%2Fgeo%2Fwgs84_pos%23long%3E+%3Flon+.%0D%0A++%3Fs+%3Curi%3A%2F%2Fopensheffield.org%2Fproperties%23sensorId%3E+%3Fid+.%0D%0A++FILTER%28NOT+EXISTS+%7B+%3Fs+a+%3Curi%3A%2F%2Fopensheffield.org%2Ftypes%23diffusionTube%3E+%7D+%29%0D%0A%7D%0D%0A&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on')
      .then(res => {
        this.setState({ 'sensorData' : res });
      });
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

  selectSensor = (markerClusterer) => {
    console.log("%o",markerClusterer);
    this.setState( { detail_visible : true, map_cell_size:5, detail_cell_size:5 } );
  }

  render() {
    return <div style={{"flex" :"1"}} >
        <Grid style={{"height":"95%"}}>
          <Cell size={2}>
            <FacetPanel/>
            <button onClick={this.showDetail}>Toggle</button>
          </Cell>
          <Cell size={this.state.map_cell_size}>
            <MainMapPanel  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                           loadingElement={<div style={{ }} />}
                           containerElement={<div style={{ "flex":"1", "height":"95%" }} />}
                           mapElement={<div style={{ height: '95%', flex:'1' }} />} 
		           sensors={this.state.sensorData} 
		           onClusterClick={this.selectSensor} />
          </Cell>
          { this.state.detail_visible ? <Cell size={this.state.detail_cell_size}> <SensorDetailPanel mode="none" /> </Cell> : null }
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


// See https://tomchentw.github.io/react-google-maps/#googlemap
const MainMapPanel = withScriptjs(withGoogleMap((props) =>
  <GoogleMap defaultZoom={10} defaultCenter={{ lat: 53.3811, lng:-1.4701 }} >
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60} onClick={props.onClusterClick} defaultZoomOnClick={false} >
      { props.sensors.data.results.bindings.map ( sensor => (
        <Marker key={sensor.id.value} position={{ lat:parseFloat(sensor.lat.value), lng:parseFloat(sensor.lon.value)}}/>
      ) ) }
    </MarkerClusterer>
  </GoogleMap>
))

class SensorDetailPanel extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    let result = null;

    switch ( this.props.mode ) {
      case 'sensorDetail':
        break;
      case 'clusterSelect':
        break;
      default:
        result = (
          <div>
            <p>Select a sensor</p>
          </div>
        )
        break;
    }

    return result;
  } 
} 

