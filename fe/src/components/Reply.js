import React from 'react'
import Twitter from "../images/twlg.jpg"
import {Link} from 'react-router-dom';

const Reply = (reply) => {
    console.log("entered rep:",reply,"rep data")
  return (
    <>
        <div className='row tweet-div'>
    <div className='col-1 tw1'>
    <div className='pic-section'>
        <img src={Twitter} alt='img' />
    </div>
    </div>
    <div className='col-10 tw2'>
    <div className='user-name'>
        <Link to='/profile' >@ajith_gurram </Link><span>-Fri Jul 21 2003 </span>
    </div>
    <div className='content-section'>
    <p>
    Nice pic ajith</p>
    </div>
    </div>
</div>
<div className='likes-section'>
            <div className='btn btn-outline-primary lks like-btn'>
            <p><i className=" fa-regular fa-heart"></i> 5</p>
            
            </div>
            <div className='btn btn-outline-primary lks' data-bs-toggle="modal" data-bs-target="#exampleModal1" >
            <pre><i className="fa-regular fa-comment"></i> 8</pre>
            </div>

            <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModal1Label">Tweet your reply</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <input  type='text-area'  placeholder='reply'/> <br/> <br/>
                        
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Reply</button>
                    </div>
                    </div>
                </div>
    </div>


            <div className='btn btn-outline-primary lks' >
            <pre><i className="fa-solid fa-retweet"></i> 7</pre>
            </div>
        </div>
    </>
  )
}

export default Reply