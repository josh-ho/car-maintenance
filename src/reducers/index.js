import { combineReducers } from 'redux'
import * as vehicleActionTypes from '../constants'

const vehicleData = ( state = {}, action ) => {
  switch( action.type ) {
    case vehicleActionTypes.LOAD_VEHICLE :
      return {
        ...state,
        vehicles:action.data,
        loaded: true
      }
    default :
      return state
  }
}

const rootReducer = combineReducers( {
  vehicleData
})

export default rootReducer
