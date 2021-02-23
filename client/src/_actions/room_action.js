import { ROOM_USER } from './types'

export function camMaking() {
  const stream = navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  return {
    //action
    type: ROOM_USER ,
    payload: stream
  }

}
