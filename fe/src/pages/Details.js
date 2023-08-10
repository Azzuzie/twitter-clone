// import React from  'react'
// import React,{useState} from  'react'
// import {toast} from 'react-toastify'
// import axios from 'axios';
// import Twitter from "../images/twlg.jpg"
import {Link} from 'react-router-dom';

import './Details.css'
import Reply from '../components/Reply'

// import Twitter from "../images/twlg.jpg"

const Details = ({tweet}) => {

// const [replies,setReplies]=useState([])

// setReplies(tweet.replies)
// // console.log(tweet)
return(
    <>
    <div className='row tweet-div'>
    <div className='col-1 tw1'>
    <div className='pic-section'>
        <img src={tweet.tweetedBy.profilePicture} alt='img' />
    </div>
    </div>
    <div className='col-10 tw2'>
    <div className='user-name'>
        <Link to='/profile' >@{tweet.tweetedBy.username} </Link><span>- {tweet.createdAt} </span>
    </div>
    <div className='content-section'>
    <p>{tweet.content}</p>
    </div>
    <div className='img-section'> 
        <img src={tweet.image} alt='img' className=''/>
    </div>
    </div>
</div>

<div className='likes-section'>
            <div className='btn btn-outline-primary lks like-btn'>
            <p><i className=" fa-regular fa-heart"></i> {tweet.likes.length}</p>
            
            </div>
            <div className='btn btn-outline-primary lks' data-bs-toggle="modal" data-bs-target="#exampleModal1" >
            <pre><i className="fa-regular fa-comment"></i> {tweet.replies.length}</pre>
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
            <pre><i className="fa-solid fa-retweet"></i>  {tweet.retweetBy.length}</pre>
            </div>
        </div>

        {/* //replies section */}

        <h3>Replies</h3>
        <Reply tweet={tweet}/>
        </>
)
 
}

export default Details