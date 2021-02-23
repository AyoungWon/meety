import { ROOM_USER } from '../_actions/types'

export default function(state = {} ,action) {
switch (action.type) {
  case ROOM_USER:
    console.log(action)
      return { ...state, streamData: action.payload}
    break;

  default:
    return state;
}
}