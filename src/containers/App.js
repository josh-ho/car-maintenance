import React, { Component } from 'react';
import { connect } from 'react-redux'
import Grid from '../components/Grid'
import './App.css';

class App extends Component {
  render() {
    const { vehicleData } = this.props
    console.log( vehicleData, this.props )
    return (
      <main className="App">
        {
          vehicleData &&
          <Grid
            data={vehicleData.vehicles}
          />
        }
      </main>
    );
  }
}

const mapStateToProps = ( state ) => {
  console.log( state )
  return {
    vehicleData : state.vehicleData
  }
}

export default connect( mapStateToProps )( App );
