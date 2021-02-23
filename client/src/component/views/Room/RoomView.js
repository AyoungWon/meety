import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector, useStore} from 'react-redux'
import { withRouter } from 'react-router-dom'


function RoomView() {

const [Stream, setStream] = useState();
const userVideo = useRef();
const dispatch = useDispatch()
const streamData  = useSelector(state => state.stream)
//setStream(streamData)
console.log(streamData)
  

let UserVideo;
if (Stream) {
  UserVideo = (
    <video playsInline muted ref={userVideo} autoPlay />
  );
}
  return (
    <div>
      {UserVideo}
    </div>
  )
}

export default withRouter(RoomView)


