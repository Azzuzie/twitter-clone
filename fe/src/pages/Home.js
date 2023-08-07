import React, {  useEffect, useState} from 'react'
import "./Home.css"
import axios from 'axios'
import {  toast } from 'react-toastify';
// import Twitter from "../images/twlg.jpg"
import Slide from '../components/Slide'
import Tweet from "../components/Tweet"
 import {useNavigate} from 'react-router-dom';
import {  useDispatch,useSelector } from 'react-redux';
import { selectTweets,fetchTweets } from '../redux/tweetSlice';

const Home = () => {

  
 const navigate=useNavigate()
 const dispatch = useDispatch();

//  const dispatch = useDispatch();
 let { tweets } = useSelector(selectTweets);
 tweets=tweets.tweets
 debugger
 useEffect(() => {
    dispatch(fetchTweets());
 }, [dispatch]);



  


 const CONFIG_OBJ={
  headers:{
    "Content-Type":"application/json",
    "Authorization":"Bearer "+localStorage.getItem("token")
  }
}
// const {tweets}=useSelector(state=>state.tweets)/
// axios.get(`http://localhost:4000/tweets`,CONFIG_OBJ)
//           .then((result) => {
//             if (result) {
//               dispatch(Tasks(result.data.tweets))
//               toast.success('Login Successful!');
//               navigate('/home')
//             }
//           })
//           .catch((error)=>{
//             toast.error("Error while fetching tweets")
//           })
// const dispatch=useDispatch()
// const [tweets,setTweets]=useState([])
// const tweets=useSelector(Tweets)


  // const getTweets=async()=>{
  //   // var user=localStorage.getItem('user')
    
  //  const response=await axios.get(`http://localhost:4000/tweets`,CONFIG_OBJ)
  //  console.log(response)
  //  setTweets(response.data.tweets)
  //  console.log(tweets)
  // }
  // getTweets()

  // const navigate=useNavigate()
  const [image,setImage]=useState({preview:'',data:''})
  const [content,setContent]=useState('')
  // const [tweets, setTweets] = useState([]);

  const handleFileSelect=(event)=>{
      const img={
        preview:URL.createObjectURL(event.target.files[0]),
        data:event.target.files[0]
      }
      setImage(img)
  }

  const handleImgUpload=async()=>{
    let formData=new FormData();
    formData.append('file',image.data);

    const response=axios.post("http://localhost:4000/uploadFile",formData)
    return response;
  }

  const addTweet= async ()=>{
      if(content === ''){
          toast.error("Add Description..")
      }
     else if(image.preview !== ''){
      const imgRes=await handleImgUpload();
      const request={content:content,image:`http://localhost:4000/${imgRes.data.fileName}`}
      const postResponse=await axios.post("http://localhost:4000/tweet",request,CONFIG_OBJ)

      if(postResponse.status === 201){
        // dispatch(addTweet(content))
        toast.success("Tweet added successfully")
          navigate('/home')
      }
      else{
        toast.error("Some error while adding tweet")
        navigate('/home')
      }
     }
     else{
      const request={content:content}
      const postResponse=await axios.post("http://localhost:4000/tweet",request,CONFIG_OBJ)

      if(postResponse.status === 201){
        toast.success("Tweet added successfully")
          navigate('/home')
      }
      else{
        toast.error("Some error while adding tweet")
        navigate('/home')
      }
     }
    
  }

//   const addTweet= async ()=>{
//     if(content === ''){
//         toast.error("Add Description..")
//     }
//    else if(image.preview !== ''){
//     const imgRes=await handleImgUpload();
//     const request={content:content,image:`http://localhost:4000/${imgRes.data.fileName}`}
//     const postResponse=await axios.post("http://localhost:4000/tweet",request,CONFIG_OBJ)

//     if(postResponse.status === 201){
//       toast.success("Tweet added successfully")
//       navigate('/home')
//       setContent('')
//       setImage({})
//     }
//     else{
//       toast.error("Some error while adding tweet")
//       navigate('/home')
//     }
//    }
//    else{
//     const request={content:content}
//     const postResponse=await axios.post("http://localhost:4000/tweet",request,CONFIG_OBJ)

//     if(postResponse.status === 201){
//       toast.success("Tweet added successfully")
//       navigate('/home')
//       setContent('')
//     }
//     else{
//       toast.error("Some error while adding tweet")
//       navigate('/home')
//     }
//    }
  
// }

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
                      <input  placeholder='Description' onChange={(ev) => setContent(ev.target.value)}/> <br/> <br/>
                      <p>Upload image</p>
                      <input name='file' type='file' placeholder='add image' onChange={handleFileSelect}/>
                      <div>
                        {image.preview && <img src={image.preview} width='400' height='200' alt='image_upload'/>}
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>addTweet()}>Tweet</button>
                  </div>
                </div>
              </div>
            </div>
       </div>
      </div>

       <div className='d2'>
        <div className='scroll-bar'>
          <div className='contnt'>
          {/* {tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))} */}
            {tweets.length ? (
        <div className='contnt'>
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      ) : (
        <h2>No tweets posted yet</h2>
      )}
            
          </div>
        </div>
       </div>

      </div>
    </div>
   </div>
  )
}

export default Home