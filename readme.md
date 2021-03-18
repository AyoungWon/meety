# MEETY
***

MEETY 웹은 다른 설치 프로그램 필요 없이 **1:1 화상 통화 및 채팅**이 가능한 서비스입니다. 

## Let's see
<img src="/README.assets/asset6.png"  width="300px" height="200px">
* youtube: <https://youtu.be/5YucE1_x3DQ>


***

## 개발 동기
코로나 문제로 재택근무 및 비대면 만남이 활성화 되다 보니, 화상회의 서비스가 많이 사용되기 시작했고, 웹에서 실시간으로 다른 사람과 화상으로 통화하고 채팅하는 서비스를 구현해보고 싶다고 생각하게 되어 만들게 되었습니다.

## 기술 스택

+ Front
  - VanilaJS
  - React
  - Redux
  - PeerJS(WebRTC Library)
  - Socket.io Client
+ Back
  - VanilaJS
  - NodeJS
  - Express
  - Socket.io
  - MongoDB & Mongoose

## 특징
- WebRTC와 Socket.io를 활용한 화상 통화 서비스
- Socket.io를 이용한 실시간 채팅 서비스
- Redux를 활용한 Auth관리
- MongoDB Atlas를 이용한 사용자 정보 관리

|||
|:---:|:---:|
| <img src="/README.assets/asset1.png"  width="300px" height="200px"><br>로그인 페이지<br>|<img src="/README.assets/asset2.png"  width="300px" height="200px"><br>회원가입 페이지|
|<img src="/README.assets/asset3.png"  width="300px" height="200px"><br>닉네임을 설정하고 채팅방에 입장할 수 있습니다.<br>|<img src="/README.assets/asset4.png"  width="300px" height="200px"><br>닉네임을 입력 후, 닉네임 변경, 채팅방 만들기가 가능합니다.|
|<img src="/README.assets/asset5.png"  width="300px" height="200px"><br>Room ID를 이용하여 다른 채팅방에 입장할 수 있습니다.<br>|<img src="/README.assets/asset6.png"  width="300px" height="200px"><br>채팅방에서는 실시간 화상 대화가 가능하고, 캠 화면이나 소리를 끄는 기능이 제공됩니다, 실시간으로 채팅 또한 가능하며, 다른 유저가 입장하거나 퇴장할 시 채팅창에서 메세지로 알 수 있습니다.|