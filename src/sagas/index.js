import { fork, call, put } from 'redux-saga/effects'
import * as actions from '../actions'

function* loadVehicleData() {
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

function* saveVehicleData() {
  
}

export function* getVehicle() {
  const vehicleData = yield call( loadVehicleData )
  yield put( actions.loadVehicleData( vehicleData ) )
}

export function* saveImageToServer() {

}

export default function* rootSaga() {
  //automatically load the vehicle data right off the bat
  yield fork( getVehicle )
}
