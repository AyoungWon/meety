import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector, useStore} from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from "socket.io-client";
import Peer from 'peerjs';
import './RoomView.css'


function RoomView(props) {
  const ROOM_ID = props.match.params.roomId
  //const socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
  const [Stream, setStream] = useState();
  const [Parter, setParter] = useState()
  const userVideo = useRef();
  const partnerVideo = useRef();
  let socket = useRef();
  let peer;
  let myStream;

  useEffect(() => {
    socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      myStream = stream
      setStream(stream)
      peer.on('call', call => {
        call.answer(stream)
        call.on('stream', stream => {
          setParter(stream)
          partnerVideo.current.srcObject = stream;
        })
      })
      socket.on('user-connected', (userId) => {
        connetToNewUser(userId, stream)
      })
      const connetToNewUser = (userId, Stream) => {
        console.log('new user', userId, Stream)
        const call = peer.call(userId, Stream)
        call.on('stream',  userVideoStream => {
          setParter(userVideoStream)
          console.log(partnerVideo)
          partnerVideo.current.srcObject = userVideoStream;
    
      })
    }

    })

    peer = new Peer(undefined, {
      host: '/',
      port: 9000,
      path: '/myapp',
      stream : Stream
    });
  
    peer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id)
    })

  

  

  }, [])


  
  console.log('@@@@')
  
  useEffect(() => {
    if (userVideo.current) {
      userVideo.current.srcObject = Stream;
    }
  }, [Stream])



  let UserVideo;
  if (Stream) {
    UserVideo = (
      <video playsInline muted ref={userVideo} muted autoPlay />
    );
  }

  let PartnerVideo;
  if (Parter) {
    PartnerVideo = (
      <video playsInline ref={partnerVideo} muted autoPlay />
    );
  }

 

  return (
    <div className="video-grid">
    {UserVideo}
    {PartnerVideo}
  </div>
  )

}

export default withRouter(RoomView)


