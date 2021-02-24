import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector, useStore} from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from "socket.io-client";


function RoomView(props) {
  const ROOM_ID = props.match.params.roomId
  //const socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
  const [Stream, setStream] = useState();
  const userVideo = useRef();
  let socket = useRef();

  useEffect(() => {
    socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
    const stream = navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      setStream(stream)
    })
    socket.emit('join-room', ROOM_ID)

    socket.on('user-connected', () => {
      connetToNewUser()
    })
  }, [])


  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = Stream;
    }
  }, [Stream])


/*   socket.on('user-connected', () => {
    console.log('@@@@@')
    connetToNewUser()
  }) */


  const connetToNewUser = () => {
    console.log('new user')
  }

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


