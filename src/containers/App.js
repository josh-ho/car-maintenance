import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BarChart, XAxis, YAxis, Legend, Bar, CartesianGrid, Tooltip } from 'recharts'
import MiniCooper from '../assets/mini-cooper.jpg'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 700,
      height: 400,
      vehicleIndex: 0,
      vehicleData : {},
      content: undefined
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
    const { width, height, vehicleData, vehicleIndex } = this.state

    let nextState = {}

    if(!vehicleData.data || JSON.stringify(vehicleData.data) !== JSON.stringify(nextProps.vehicleData.vehicles)) {
      nextState = {
        vehicleData: {
          data: nextProps.vehicleData.vehicles[vehicleIndex].maintenance,
          type: nextProps.vehicleData.vehicles[vehicleIndex].type,
          year: nextProps.vehicleData.vehicles[vehicleIndex].year,
          mileage: nextProps.vehicleData.vehicles[vehicleIndex].mileage
        },
      }

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
          content: (
            <section>
              <img src={MiniCooper} alt="Mini Cooper" />
              <h1>{`${nextProps.vehicleData.vehicles[vehicleIndex].type} ${nextProps.vehicleData.vehicles[vehicleIndex].year}`}</h1>
              <p>Odometer Reading: {nextProps.vehicleData.vehicles[vehicleIndex].mileage}</p>
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip/>
                <Legend />
                {
                  data.map(childData => {
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
          )
        }
      }
    }

    this.setState(nextState)
  }

  render() {
    const { vehicleData, content } = this.state
    console.log( vehicleData )
    return (
      <main className="App">
        {content}
      </main>
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    vehicleData : state.vehicleData
  }
}

export default connect( mapStateToProps )( App );
