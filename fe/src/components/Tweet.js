import {React,useState} from 'react'
// import Twitter from "../images/twlg.jpg"
import {Link} from 'react-router-dom';
import Details from '../pages/Details'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Tweet.css'
import { toast } from 'react-toastify';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import UserProfile from '../pages/UserProfile';
// import { useState } from "react";


const Tweet = ({ tweet }) => {
  const [lgShow, setLgShow] = useState(false);
  const [rep,setRep]=useState('')
  const [isLiked, setIsLiked] = useState(false);
  // console.log("Entered tweet component")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const navigate=useNavigate()

  const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }

  const HandleLike = async ({tweet}) => {
    // debugger
    // if (isLiked) {
    // await axios.post(`http://localhost:4000/tweet/${tweet._id}/dislike`, CONFIG_OBJ);
    //     setIsLiked(false);
    //   } else {
    //     await axios.post(`http://localhost:4000/tweet/${tweet._id}/like`, CONFIG_OBJ)
    //     .then((response)=>{
          
    //       setIsLiked(true);
    //     })
    //     .catch(()=>{
    //       toast.error("Tweet error")
    //     })
    //   }
    debugger

    const response=await axios.post(`http://localhost:4000/tweet/${tweet._id}/like`, CONFIG_OBJ)
    console.log(response)
      if(response){
        setIsLiked(true)
        
      }
    
    };

const Reply=async({tweet})=>{
  if(!rep){
    toast.error("add reply")
  }
  else{
    // const user=JSON.parse(localStorage.getItem('user'))
    const body={content:rep}
    debugger
    await axios.post(`http://localhost:4000/tweet/${tweet._id}/addReply`,body,CONFIG_OBJ)
    .then((response)=>{
        toast.success("replied successfully")
    })
    .catch(()=>{
      toast.error("Error while adding reply")
    })
  }
}

// const Navig=({id})=>{
//   const user=JSON.parse(localStorage.getItem("user"))
// if(id===user.id){
//   navigate('/profile')
// }
// else {
//   <UserProfile user={tweet.tweetedBy}/>
//   navigate('/userprofile')
// }
// }

  return (
    <>

    <div
      className='row tweet-div'
      onClick={() => setLgShow(true)}
    >
      <div className='col-1 tw1'>
        <div className='pic-section'>
          <img src={tweet.tweetedBy.profilePicture} alt='img' />
        </div>
      </div>
      <div className='col-10 tw2'>
        <div className='user-name'>
          <Link to='/userprofile' uu={tweet.tweetedBy}>@{tweet.tweetedBy.username}
          </Link>
          <span>- {tweet.createdAt}</span>
        </div>
        <div className='content-section'>
          <p>{tweet.content}</p>
        </div>
        <div className='img-section'>
          <img src={tweet.image} alt='img' />
        </div>
      </div>
    </div>

    <div className='likes-section'>
    <div
        className={`btn btn-outline-primary lks ${isLiked ? 'liked' : ''}`}
        onClick={()=>HandleLike({tweet})}
      >
        <p><i className=" fa-regular fa-heart"></i> {tweet.likes.length}</p>
      </div>

      <div className='btn btn-outline-primary lks' variant="primary" onClick={handleShow}>
        <pre><i className="fa-regular fa-comment"></i> {tweet.replies.length}</pre>
      </div>

      {/* <div className="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModal1Label">Tweet your reply</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type='text-area' placeholder='reply' onChange={(ev) => setRep(ev.target.value)}/> <br/> <br/>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>Reply()}>Reply</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className='btn btn-outline-primary lks' >
        <pre><i className="fa-solid fa-retweet"></i> {tweet.retweetBy.length}</pre>
      </div>
    </div>

   

    <Modal
      size="lg"
      show={lgShow}
      onHide={() => setLgShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Tweet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='scroll'>
          <div className='content'>
            <Details tweet={tweet} />
            {/* <Details/> */}
          </div>
        </div>
      </Modal.Body>
    </Modal>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tweet Your Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <form>
              <input type='text-area' placeholder='reply' onChange={(ev) => setRep(ev.target.value)}/> <br/> <br/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>Reply({tweet})}>
            Reply
          </Button>
        </Modal.Footer>
      </Modal>
  </>
);
};

export default Tweet;
