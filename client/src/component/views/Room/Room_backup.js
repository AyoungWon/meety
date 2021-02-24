import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom'
import uuid from 'react-uuid'
import {camMaking, Making} from '../../../_actions/room_action'

function Room() {
/*   useEffect(() => {
  window.location.href=`/room/${uuid()}`

  }, []) */

  const [stream, setStream] = useState();
  const dispatch = useDispatch()
  const userVideo = useRef();
  useEffect(async () => {
  	console.log(await Making());
  	const stream = await Making();
    dispatch(stream)
    .then(response => {
      console.log(response)
      if(response){
        console.log(response)
        setStream(response.payload)
      }
    }).catch(e => console.log(e))
    
  }, [])


  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream])

  const streamData  = useSelector(state => state)
  console.log(streamData)

  let UserVideo;
  if (stream) {
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

export default withRouter(Room)
