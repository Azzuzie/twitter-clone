import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js'
import Profile from './pages/Profile.js'
import Details from './pages/Details.js';
import UserProfile from './pages/UserProfile.js';
// import Total from './pages/Total.js'
// import Navbar from "./components/Navbar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/details" element={<Details/>}></Route>
        <Route exact path="/userprofile" element={<UserProfile/>}></Route>
        {/* <Route exact path="/totalrev" element={<Total/>}></Route> */}
   
      </Routes>
    </Router> 
    <ToastContainer />
    </div> 
  );
}

export default App;
