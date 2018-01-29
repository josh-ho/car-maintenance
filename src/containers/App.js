import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid, Tooltip } from 'recharts'
import Dropzone from 'react-dropzone'
import MiniCooper from '../assets/mini-cooper.jpg'
import { uploadAndParseImage } from '../actions'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 700,
      height: 400,
      vehicleIndex: 0,
      vehicleData : {},
      content: undefined,
      acceptedFiles: [],
      graphData: []
    }
  }

  componentWillMount(){
    const initState = {
      content: (
        <p>Loading Data...</p>
      )
    }
    this.setState(initState)
  }

  componentWillReceiveProps(nextProps) {
    const { vehicleData, vehicleIndex } = this.state

    let nextState = {}
    console.log(nextProps.vehicleData)
    if(!vehicleData.data || JSON.stringify(vehicleData.data) !== JSON.stringify(nextProps.vehicleData.vehicles)) {
      nextState = {
        vehicleData: {
          data: nextProps.vehicleData.vehicles[vehicleIndex].maintenance,
          type: nextProps.vehicleData.vehicles[vehicleIndex].type,
          year: nextProps.vehicleData.vehicles[vehicleIndex].year,
          mileage: nextProps.vehicleData.vehicles[vehicleIndex].mileage
        },
      }
      console.log(nextState)
      if(!vehicleData.data) {
        const maintenanceData = nextProps.vehicleData.vehicles[vehicleIndex].maintenance
        const data = Object.keys(maintenanceData).map(key => {
          const returnObj = {
            name: key,
          }
          returnObj[key] = maintenanceData[key].mileage
          return returnObj
        })

        nextState = {
          ...nextState,
          graphData: data,
        }
      }
      console.log(nextState)
      if(Object.keys(nextProps.parsedImageData).length) {
        console.log(nextProps.parsedImageData[0])
        nextState = {
          ...nextState,
          vehicleData: {
            ...nextState.vehicleData,
            mileage: (nextProps.parsedImageData.parsedData[0]) ? nextProps.parsedImageData.parsedData[0].description : undefined
          }
        }
      }
    }
    console.log(nextState)
    this.setState(nextState)
  }

  dropHandler = (accepted, rejected) => {
    const { uploadAndParseImage } = this.props
    uploadAndParseImage(accepted)
    this.setState({accepted})
  }

  render() {
    const { vehicleData, graphData, vehicleIndex, width, height } = this.state
    const vehicleType = (vehicleData) ? vehicleData.type : undefined
    const vehicleYear = (vehicleData) ? vehicleData.year : undefined
    return (
      <main className="App">
      <section>
        <img src={MiniCooper} alt="Mini Cooper" />
        <h1>{`${vehicleType} ${vehicleYear}`}</h1>
        <p>Odometer Reading: {vehicleData.mileage}</p>
        <Dropzone
          accept="image/jpeg, image/png"
          onDrop={this.dropHandler}
        >
        </Dropzone>
        <BarChart
          width={width}
          height={height}
          data={graphData}
          margin={{top: 20, right: 30, left: 20, bottom: 5}}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
          <Legend />
          {
            graphData.map(childData => {
              const randomColor = '#'+'0123456789abcdef'.split('').map(
                (v, i, a) => {
                  return i>5 ? null : a[Math.floor(Math.random()*16)]
                }
              ).join('')
              return (
                <Bar
                  dataKey={childData.name}
                  stackId="a"
                  fill={randomColor}
                />
              )
            })
          }
        </BarChart>
      </section>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uploadAndParseImage: files => {
      console.log(files)
      dispatch(uploadAndParseImage(files))
    }
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    vehicleData : state.vehicleData,
    parsedImageData : state.imageData
  }
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
