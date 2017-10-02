import { fork, call, put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* loadVehicleData() {
  return yield new Promise( ( resolve, reject ) => {
    window.firebase.ref( 'vehicles' ).on( "value",
    ( data ) => {
      resolve( data.val() )
    },
    ( err ) => {
      reject( err )
    }
   )
  } )
}

export function* getVehicle() {
  const vehicleData = yield call( loadVehicleData )
  yield put( actions.loadVehicleData( vehicleData ) )
}

export default function* rootSaga() {
  //automatically load the vehicle data right off the bat
  yield fork( getVehicle )
}
