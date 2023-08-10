
import { useEffect, useState } from "react"
import "../pages/Home.css"
import './Tweet.css'
import axios from "axios"
// import Twitter from "../images/twlg.jpg"
import {Link} from 'react-router-dom';
// import {useSelector,useDispatch} from 'react-redux'
// import {fetchReplyTweets,selectTweets} from '../redux/tweetSlice'
// import Tweet from './Tweet'


const Reply = ({tweet}) => {

const [reply,setReply]=useState([])
const [repl,setRepl]=useState('')

console.log(tweet,repl)


useEffect(()=>{
    const CONFIG_OBJ={
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }
    const getReplies=async(tweet)=>{
        const response=await axios.get(`http://localhost:4000/tweets/${tweet._id}/replies`,CONFIG_OBJ)
        setReply(response.data.replies)
    }
    getReplies(tweet)
},[tweet])
  return(

    <>
     
     {reply.map((rep)=>{
        return <div>
            
    <div className='row tweet-div'>
      <div className='col-1 tw1'>
        <div className='pic-section'>
          <img src={rep.repliedBy.profilePicture} alt='img' />
        </div>
      </div>
      <div className='col-10 tw2'>
        <div className='user-name'>
          <Link to='/profile'>@{rep.repliedBy.username}
          </Link>
          <span>- {tweet.createdAt}</span>
        </div>
        <div className='content-section'>
          <p>{rep.content}</p>
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
                <input type='text-area' placeholder='reply' onChange={(ev) => setRepl(ev.target.value)}/> <br/> <br/>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>Reply()}>Reply</button>
            </div>
          </div>
        </div>
      </div>



      <div className='btn btn-outline-primary lks' >
        <pre><i className="fa-solid fa-retweet"></i> {tweet.retweetBy.length}</pre>
      </div>
    </div>
        </div>
     })}

    </>
  )
}

export default Reply