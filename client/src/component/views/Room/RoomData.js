import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {camMaking} from '../../../_actions/room_action'

function RoomData(props) {
  const roomId = props.match.params.roomId
  const [stream, setStream] = useState();
  const dispatch = useDispatch()
  const userVideo = useRef();
  useEffect(() => {

    dispatch(camMaking())
    .then(response => {
      if(response){
        console.log('response')
        console.log(response)
        setStream(response.payload)
  
        
      }
    })
    

  }, [])


  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream])


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
export default withRouter(RoomData)
