import React, {useEffect, useState, useRef} from 'react'
import { useDispatch,useSelector, useStore} from 'react-redux'
import { withRouter } from 'react-router-dom'
import io from "socket.io-client";
import Peer from 'peerjs';
import './RoomView.css'
import Chatting from './Chatting';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import RoomEnter from './RoomEnter';

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
  const [Render, setRender] = useState(true)
  const [PartnerName, setPartnerName] = useState('')

  let peer;
  let myStream;
  const test = 'test'

  useEffect(() => {
    //socket = io('http://localhost:5000', {transports: ['websocket', 'polling', 'flashsocket']});
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
      const connetToNewUser = (userId, Stream, nick) => {
        console.log('new user', userId, Stream)
        const call = peer.call(userId, Stream)
        call.on('stream',  userVideoStream => {
          setParter(userVideoStream)
          console.log(partnerVideo)
          partnerVideo.current.srcObject = userVideoStream;
        })
      }
      socket.on('user-connected', (userId, nick) => {
        console.log(userId)
        setPartnerName(nick)
        connetToNewUser(userId, myStream)
      })
    })  
  }, [])

  useEffect(() => {

    peer = new Peer(undefined, {
      host: '/',
      port: 9000,
      path: '/myapp',
      stream : Stream
    });

    peer.on('open', id => {
      socket.emit('join-room', ROOM_ID, id, NickName)
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
      <video playsInline ref={partnerVideo} muted autoPlay />
    );
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

  const handleNickname = (e) => {
    setNickName(e.currentTarget.value)
  }

  const sendNickName = () => {
    setRender(false)
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
            <button id="exit-btn" ><FontAwesomeIcon icon={faDoorOpen}/></button>
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
 
      <RoomEnter 
      render={Render}
      nick={NickName}
      handleNickname={handleNickname}
      sendNickName={sendNickName}
      />

    </div>


  )

}

export default withRouter(RoomView)


