import { React, useEffect, useState } from "react";
import "./Profile.css";
import "./Home.css"
import axios from 'axios'
import { toast } from "react-toastify";
import Slide from "../components/Slide";
import Tweet from "../components/Tweet";
import Twitter from "../images/twlg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectTweets,fetchUserTweets } from '../redux/tweetSlice';
// import {selectUsers} from '../redux/userSlice'
import { updateUser } from "../redux/userSlice";
// import { updateUser } from "../redux/userSlice";


const Profile = () => {
  // console.log(uu)
  // debugger
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState(Date);

  const dispatch = useDispatch();

  let { tweets } = useSelector(selectTweets);
  tweets=tweets.tweets


  const array= useSelector(state=>state.user)
  let { user} = array;
   user= user[0];
  debugger
  console.log(user.name)

  useEffect(() => {
     dispatch(fetchUserTweets());
  }, [dispatch]);


  const CONFIG_OBJ={
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem("token")
    }
  }


 const saveDetails = async () => {
  if (!name || !location || !dob) {
    toast.error("Fields required");
  } else {
    const user=JSON.parse(localStorage.getItem("user"))
    const id=user.id;
    const body = {
      id,
      name,
      dateOfBirth: dob,
      location,
    };
    await axios.put(`http://localhost:4000/user/${user._id}`, body, CONFIG_OBJ)
      .then((response) => {
        toast.success("edited successfully");
        dispatch(updateUser(body))
      })
      .catch((error) => {
        toast.error("Error while editing profile");
      });
  }
};

  //  const dispatch=useDispatch()
  

  // console.log(currentUser);
 




  return (

    
    <div className="container">
      <div className="row">
        <Slide />
        <div className="col-9 profile-section">
          <div className="clr"></div>

          <div className="details-section">
            <div className="profile-list">
              <div className="profile-pic">
                <img src={Twitter} alt="profile-pic" />
              </div>

              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Edit Profile
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <input
                            type="text"
                            placeholder="name"
                            onChange={(ev) => setName(ev.target.value)}
                          />{" "}
                          <br /> <br />
                          <input
                            type="text"
                            placeholder="location"
                            onChange={(ev) => setLocation(ev.target.value)}
                          />{" "}
                          <br /> <br />
                          <input
                            type="date"
                            placeholder="DOB"
                            onChange={(ev) => setDob(ev.target.value)}
                          />{" "}
                          <br /> <br />
                          {/* <p>Profile picture</p>
          <input name='file' type='file' placeholder='add image' onChange={handleFileSelect}/>
          <div>
            {image.preview && <img src={image.preview} width='400' height='200' alt='image_upload'/>}
          </div> */}
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => saveDetails()}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="details-list">
              <div className="name">
                <h5>{user.name}</h5>
                <p>@{user.username}</p>
              </div>
              <div className="dob">
                <div className="dob-box">
                  <p>
                    <i class="fa-solid fa-calendar-days"></i> {user.dateOfBirth}
                  </p>
                </div>
                <div className="dob-box">
                  <i class="fa-sharp fa-solid fa-location-dot"></i>{" "}
                  {user.location}
                </div>
              </div>
            </div>

            <div className="fans-list">

              <div className="follow">
              <p>{user.following.length} following</p>  
              </div>
              <div className="follow">
                <p>{user.followers.length} following</p>
              </div>
            </div>
          </div>


          <div className='d2'>
        <div className='scroll-bar'>
          <div className='contnt'>
          <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
              Tweets and replies
            </h3>
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

          {/* <div className="tw-rpl">
           
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Profile;
