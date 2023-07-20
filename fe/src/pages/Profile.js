import React from 'react'
import './Profile.css'
import Slide from "../components/Slide"
import Tweet from "../components/Tweet"
import Twitter from "../images/twlg.jpg"
// import {Link} from 'react-router-dom';
const Profile = () => {
  return (
    <div className='container'>
    <div className='row'>
        <Slide/>
        <div className='col-9 profile-section'>
            <div className='clr'>
                
            </div>


            <div className='details-section'>
                <div className='profile-list'>
                    <div className='profile-pic'>
                            <img src={Twitter}  alt='profile-pic'/>
                    </div>
                    
                    <div>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Edit
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form>
          <input type='text' placeholder='name'/> <br/> <br/>
          <input type='text' placeholder='location'/> <br/> <br/>
          <input type='date' placeholder='DOB'/> <br/> <br/>
          <p>Profile picture</p>
          <input type='file' placeholder='add image'/>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
                    </div>
                </div>

                <div className='details-list'>
                    <div className='name'>
                        <h5>Ajith Gurram</h5>
                        <p>@ajith_gurram</p>
                    </div>
                    <div className='dob'>
                        <div className='dob-box'><p><i class="fa-solid fa-calendar-days"></i> Dec, </p></div>
                        <div className='dob-box'><i class="fa-sharp fa-solid fa-location-dot"></i> Mumbai</div>
                    </div>
                </div>

                <div className='fans-list'>
                    <div className='follow'>
                        <p>3 followers</p>
                    </div>
                    <div className='follow'>
                        <p>4 following</p>
                    </div>
                </div>
            </div>


            <div className='tw-rpl'>
            <h3 style={{textAlign:'center',textDecoration:'underline'}}>Tweets and replies</h3>
            <Tweet/>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Profile