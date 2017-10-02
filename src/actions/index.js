import * as actionType from '../constants'

export function loadVehicleData( data ) {
  return {
    type: actionType.LOAD_VEHICLE,
    data
  }
}
