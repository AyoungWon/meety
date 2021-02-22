import React, {useEffect, useState, useRef} from 'react'
import { withRouter } from 'react-router-dom'

function RoomView(props) {
const roomId = props.match.params.roomId
const [stream, setStream] = useState();

const userVideo = useRef();
useEffect(() => {

  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    setStream(stream);
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  })
  
  
/*   const videoGrid = document.getElementById('video-grid')
  const myVideo = document.createElement('video')
  myVideo.muted = true

  let myVideoStream
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    myVideoStream = stream
    addVideoStream(myVideo, stream)
  })
  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  } 
 */


}, [])

let UserVideo;
if (stream) {
  UserVideo = (
    <video playsInline muted ref={userVideo} autoPlay />
  );
}
  return (
    <div>
      {UserVideo}
      {/* <div id='video-grid' style={{width:'100%', border: '10px solid black'}}></div> */}
      {/* <div id='video-grid'></div> */}
    </div>
  )
}

export default withRouter(RoomView)


