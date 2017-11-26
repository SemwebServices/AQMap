import React, {Component} from 'react'
import {render} from 'react-dom'
import AQMap from '../../src'
import './index.css'

class Demo extends Component {
  render() {
    return <div style={{"display":"flex", "flexDirection":"column", "height":"100%"}}>
      <h1>aq-map Demo</h1>
      <AQMap style={{"flex":"1"}}/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
