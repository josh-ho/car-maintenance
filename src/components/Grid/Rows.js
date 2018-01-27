import React from 'react'

class Rows extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      type: ''
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    const { type } = this.state
    return(
      <div/>
    )
  }
}

export default Rows
