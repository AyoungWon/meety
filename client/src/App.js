
import React, {useState} from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './component/views/LandingPage/LandingPage';
import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';
import Room from './component/views/Room/Room'
import Auth from './hoc/auth'
import RoomView from './component/views/Room/RoomView';
import NavBar from './component/views/NavBar/NavBar';
import Footer from './component/views/Footer/Footer';




function App() {

  const [NavRender, setNavRender] = useState(true)

  const navRenderHandler = () => {
    setNavRender(false)
  }
  return (
    <Router>
      {NavRender ? (<NavBar/>): null}

    <div style={NavRender ? ({ height: "calc(100vh - 100px)"}) : ({ height: "100vh"})}>
      <Switch>
        <Route exact path="/room" component={Room} />
        <Route exact path="/room/:roomId" render={() => <RoomView nav={navRenderHandler}/>}/>
        <Route exact path="/" component={Auth(LandingPage,null,true)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage,false )} />
      </Switch>
    </div>
    {NavRender ? (<Footer/>): null}
  </Router>
  );
}

export default App;
