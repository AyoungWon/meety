import React, {useEffect, useState, useRef} from 'react'
import { withRouter } from 'react-router-dom'
import io from "socket.io-client";
import Peer from 'peerjs';
import './RoomView.css'
import Chatting from './Chatting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

function RoomView(props) {
  const ROOM_ID = props.match.params.roomId
  const socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
  const [Stream, setStream] = useState();
  const [Parter, setParter] = useState()
  const [VideoStopBtn, setVideoStopBtn] = useState(false)
  const [MuteBtn, setMuteBtn] = useState(false)
  const [VideoStopImage, setVideoStopImage] = useState(<FontAwesomeIcon icon={faVideo}/>)
  const [MuteImage, setMuteImage] = useState(<FontAwesomeIcon icon={faMicrophone}/>)
  const userVideo = useRef();
  const partnerVideo = useRef();
  const [NickName, setNickName] = useState()
  const [PartnerName, setPartnerName] = useState('')
  const [Render, setRender] = useState(false)
  
  let peer;
  let myStream;
  const peers = {}


  useEffect(async() => {
    props.nav()
 
    await setNickName(window.sessionStorage.getItem("nickName"))
 
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      myStream = stream
      setStream(stream)
      peer = new Peer(undefined, {
        host: '/',
        port: 9000,
        path: '/myapp',
        stream : Stream
      });
  
     

      peer.on('call', call => {
        console.log('새로 들어온 유저')
        call.answer(stream)
        call.on('stream', stream => {
          setParter(stream)
          partnerVideo.current.srcObject = stream;
          console.log(sessionStorage.getItem("nickName"))
         
        })
      })

      peer.on('open', id => {
        socket.emit('join-room', ROOM_ID, id, sessionStorage.getItem("nickName"))
      })
      
    })  



   setRender(true)
  }, [])

  useEffect(() => {
    const connetToNewUser = (userId, Stream, nick) => {
      //console.log('new user', userId, Stream)
      const call = peer.call(userId, Stream)
      call.on('stream',  userVideoStream => {
        console.log("기존 유저")
        setParter(userVideoStream)
        partnerVideo.current.srcObject = userVideoStream;
      })

      call.on('close', () => {
      UserVideo = (null)
        
      })
    
      peers[userId] = call
    }
    socket.on('user-connected', (userId, nick) => {
      setPartnerName(nick)
      connetToNewUser(userId, myStream)
      console.log(nick)
    })

    socket.on('user-disconnected', userId => {
      if (peers[userId]) {
        peers[userId].close()
       
      }
      videoRemove()
        console.log('#####')
    })
  
    
  }, [Render])

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
      <video id="partnerVideoView" playsInline ref={partnerVideo} muted autoPlay />
    );
  }

  const videoRemove = () => {
    console.log('@@@@@@@@@')
    PartnerVideo = null
    setParter(null)
  }

  const muteToggleBtn = () => {
    setMuteBtn(!MuteBtn)
    const enabled = Stream.getAudioTracks()[0].enabled;
    console.log(Stream)
    if(MuteBtn && enabled){
      Stream.getAudioTracks()[0].enabled = false
      setMuteImage(<FontAwesomeIcon icon={faMicrophoneSlash}/>)
    }else{
      Stream.getAudioTracks()[0].enabled = true
      setMuteImage(<FontAwesomeIcon icon={faMicrophone}/>)
    }
  }

  const videoToggleBtn = () => {
    setVideoStopBtn(!VideoStopBtn)
    const enabled = Stream.getVideoTracks()[0].enabled;
    if(VideoStopBtn && enabled){
      Stream.getVideoTracks()[0].enabled = false
      setVideoStopImage(<FontAwesomeIcon icon={faVideoSlash}/>)
    }else{
      Stream.getVideoTracks()[0].enabled = true
      setVideoStopImage(<FontAwesomeIcon icon={faVideo}/>)
    }
  }

 

  return (
    <div className="room-wrap" >
      <div className="room-view-wrap"> 
        <section id="left-section">
        <div className="video-grid">
          {UserVideo}
          {PartnerVideo}
        </div>
        <div className="room-menu">
          <div className="controll-btns">
            <button id="mute-btn" onClick={muteToggleBtn}>{MuteImage}</button>
            <button id="video-btn" onClick={videoToggleBtn}>{VideoStopImage}</button>
          </div>
          <div className="exit-btn">
            <a href='/'>
            <button id="exit-btn"><FontAwesomeIcon icon={faDoorOpen}/></button>
            </a>
          </div>
        </div>
        </section>
        <section id="right-section">
          <Chatting 
          socket={socket}
          nick={NickName}
          partner={PartnerName}/>
        </section>
      </div>
    </div>


  )

}

export default withRouter(RoomView)


