import React from 'react'
import "./Home.css"
// import Twitter from "../images/twlg.jpg"
import Slide from '../components/Slide'
import Tweet from "../components/Tweet"
//  import {Link} from 'react-router-dom';
// import { Button, Modal, Form } from 'react-bootstrap';
const Home = () => {
  return (
   <div className='container'>
    <div className='row'>
      <Slide />
      <div className='col-9 tweet'>
      <div className='d1'>
       <div className='c1'>
        Home
       </div>
       <div className='c2'>
       {/* <!-- Button trigger modal --> */}
<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Tweet
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New Tweet</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <input rows="2" cols="20" type='text-area'  placeholder='Description'/> <br/> <br/>
          <p>Upload image</p>
          <input type='file' placeholder='add image'/>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Tweet</button>
      </div>
    </div>
  </div>
</div>
       </div>
       </div>

       <div className='d2'>
        <div className='scroll-bar'>
          <div className='contnt'>
             <Tweet/>
             <Tweet/>
          </div>
        </div>
       </div>
      </div>
    </div>
   </div>
  )
}

export default Home