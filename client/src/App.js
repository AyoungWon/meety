
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
import RoomData from './component/views/Room/RoomData';



function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/room" component={Auth(Room,null)} />
        <Route exact path="/room/:roomId" component={Auth(RoomData,null)} />
        {/* <Route exact path="/roomview" component={Auth(RoomView,null)} /> */}
        <Route exact path="/roomview" component={Auth(RoomView,null)} />
{/*         <Route exact path="/" component={Auth(LandingPage,null,true)} /> */}
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage,false )} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
