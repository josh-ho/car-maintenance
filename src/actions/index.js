import * as actionType from '../constants'

export function loadVehicleData( data ) {
  return {
    type: actionType.LOAD_VEHICLE,
    data
  }
}

export function uploadAndParseImage(file) {
  return {
    type: actionType.UPLOAD_VEHICLE_IMAGE,
    file
  }
}

export function parsedImage(data) {
  return {
    type: actionType.PARSED_DATA,
    data
  }
}
