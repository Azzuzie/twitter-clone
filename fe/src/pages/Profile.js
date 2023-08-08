import { React, useEffect, useState } from "react";
import "./Profile.css";
// import axios from 'axios'
import { toast } from "react-toastify";
import Slide from "../components/Slide";
import Tweet from "../components/Tweet";
import Twitter from "../images/twlg.jpg";
import { useDispatch, useSelector } from "react-redux";
// import { loginError,loginSuccess } from '../redux/userSlice'
// import { userReducer } from '../redux/userReducer'
// import {Link} from 'react-router-dom';
import { selectTweets,fetchUserTweets } from '../redux/tweetSlice';

const Profile = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState(Date);

  const dispatch = useDispatch();

  let { tweets } = useSelector(selectTweets);
  tweets=tweets.tweets
  debugger
  useEffect(() => {
     dispatch(fetchUserTweets());
  }, [dispatch]);

  // const CONFIG_OBJ={
  //   headers:{
  //     "Content-Type":"application/json",
  //     "Authorization":"Bearer "+localStorage.getItem("token")
  //   }
  // }

  const saveDetails = async () => {
    toast.success("Edidted successfully..");
    console.log(name, location, dob);
  };

  //  const dispatch=useDispatch()
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser);
  // const [user,setUser]=useState([])

  // useEffect(() => {
  //   const getUser=async()=>{
  //   const result = await axios.get(`http://localhost:4000/user/${currentUser.id}`, CONFIG_OBJ);
  //   console.log(result);
  //   if (result.status === 200) {
  //     setUser(result.data.user);
  //     dispatch(loginSuccess(user))
  //     // toast.success("Tweets by user id");
  //   } else {
  //     toast.error("Some error tweets by user id");
  //     dispatch(loginError())
  //   }
  // }
  // getUser()
  // },[dispatch,CONFIG_OBJ,currentUser.id,user]);

  //   const [tweets, setTweets] = useState([]);
  // // get all tweets

  // useEffect(()=>{
  //   const getTweets=async()=>{
  //     // var user=localStorage.getItem('user')

  //    const response=await axios.get(`http://localhost:4000/mytweets`,CONFIG_OBJ)
  //    console.log(response)
  //    setTweets(response.data.tweets)
  //    console.log(tweets)
  //   }
  //   getTweets()
  // },)

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
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
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
                <h5>{currentUser.fullName}</h5>
                <p>@{currentUser.username}</p>
              </div>
              <div className="dob">
                <div className="dob-box">
                  <p>
                    <i class="fa-solid fa-calendar-days"></i> {currentUser.dob}
                  </p>
                </div>
                <div className="dob-box">
                  <i class="fa-sharp fa-solid fa-location-dot"></i>{" "}
                  {currentUser.location}
                </div>
              </div>
            </div>

            <div className="fans-list">
              <div className="follow">
                <p>7 followers</p>
              </div>
              <div className="follow">
                <p>7 following</p>
              </div>
            </div>
          </div>

          <div className="tw-rpl">
            <h3 style={{ textAlign: "center", textDecoration: "underline" }}>
              Tweets and replies
            </h3>
            {tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
