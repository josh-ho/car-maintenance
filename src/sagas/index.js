import { fork, call, put, all, takeEvery } from 'redux-saga/effects'
import * as app from '../constants'
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

function* uploadImage(imageData) {
  return yield fetch(
    app.BACKEND_URL + app.PARSE_IMAGE_ENDPOINT,
    {
      method: 'POST',
      body: JSON.stringify(imageData)
    }
  ).then(response => {
    if(response.status === 200) {
      return response.json()
    }
  }).then(data => {
    return data
  })
}

function* upload(imageData) {
  const parsedImageData = yield call(uploadImage, imageData)
  const filteredData = parsedImageData.filter(data =>
    data.description.indexOf('km') !== -1 &&
    !isNaN(parseInt(data.description.slice(0,data.description.indexOf('km')), 10)) &&
    data.description.length < 10
  )
  yield put(actions.parsedImage(filteredData))
}

function* getVehicle() {
  const vehicleData = yield call( loadVehicleData )
  yield put( actions.loadVehicleData( vehicleData ) )
}

export default function* rootSaga() {
  yield all([
    takeEvery(app.UPLOAD_VEHICLE_IMAGE, upload)
  ])
  //automatically load the vehicle data right off the bat
  yield fork( getVehicle )
}
