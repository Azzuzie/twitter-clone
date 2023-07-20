import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js'
import Profile from './pages/Profile.js'
// import Total from './pages/Total.js'
// import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        {/* <Route exact path="/totalrev" element={<Total/>}></Route> */}
   
      </Routes>
    </Router> 
   
    </div> 
  );
}

export default App;
