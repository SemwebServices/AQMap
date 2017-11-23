import React, {Component} from 'react'
import {render} from 'react-dom'

import AQMap from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>aq-map Demo</h1>
      <AQMap/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
