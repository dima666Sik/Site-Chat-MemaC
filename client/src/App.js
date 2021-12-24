import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home"
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate 
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const{user}=useContext(AuthContext);
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route path='/' element={user?<Home/>:<Login/>}/>

        <Route path='/profile/:username' element={user ? <Profile/>:<Navigate to="/login"/>}/>

        <Route path="/login" element={user ? <Navigate to="/"/>:<Login/>}/>

        <Route path="/registration" element={user ? <Navigate  to="/"/>:<Registration/>}/>

        <Route path="/messenger" element={!user ? <Navigate  to="/"/>:<Messenger/>}/>
      </Routes>
    </Router>
  );
}

export default App;