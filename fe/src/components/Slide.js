import React from 'react'
import {Link} from 'react-router-dom';
import './Slide.css'
const Slide = () => {
  return (
    <div className='col-3 slider'>
    <div className='b1'>
    
          <div className="btn-group-vertical links-group" role="group" >
          <div className='brand'><i class="fa-brands fa-twitter"></i></div>
            <Link to="/home" className="btn btn-outline-primary"  ><i class="fa-solid fa-house"></i><span>Home</span></Link>
            <Link to="/profile" className="btn btn-outline-primary"  ><i class="fa-solid fa-user"></i><span>Profile</span></Link>
            <Link to="/login" className="btn btn-outline-primary" ><i class="fa-solid fa-right-from-bracket"></i><span>Logout</span></Link>
          </div>
    </div>
    <div className='b2'>
      Logout
    </div>
  </div>
)
}

export default Slide;