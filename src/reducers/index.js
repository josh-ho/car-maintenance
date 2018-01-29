import { combineReducers } from 'redux'
import * as app from '../constants'

const vehicleData = ( state = {}, action ) => {
  switch( action.type ) {
    case app.LOAD_VEHICLE :
      return {
        ...state,
        vehicles:action.data,
        loaded: true
      }
    default :
      return state
  }
}

const imageData = (state = {}, action) => {
  switch( action.type ) {
    case app.PARSED_DATA:
      return {
        ...state,
        parsedData: action.data
      }
    default :
      return state
  }
}

const rootReducer = combineReducers( {
  vehicleData,
  imageData
})

export default rootReducer
