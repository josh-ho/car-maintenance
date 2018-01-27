import React from 'react'
import Rows from './Rows'

class Grid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gridData: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    const { gridData } = this.state

    let nextState = {}

    if(JSON.stringify(gridData) !== JSON.stringify(nextProps.data)){
      nextState = {
        gridData: nextProps.data
      }
    }
    console.log(nextState)
    this.setState(nextState)
  }

  render() {
    const { gridData } = this.state
    return(
      <table>
        <thead>
          <Rows

          />
        </thead>
        <tbody>
          <Rows

          />
        </tbody>
      </table>
    )
  }
}

export default Grid
