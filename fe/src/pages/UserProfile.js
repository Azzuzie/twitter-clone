import { React, useEffect,useState } from "react";
import "./Profile.css";
import "./Home.css"
import axios from 'axios'
// import { toast } from "react-toastify";
import Slide from "../components/Slide";
import Tweet from "../components/Tweet";
import Twitter from "../images/twlg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectTweets,fetchUserTweets } from '../redux/tweetSlice';
// import {selectUsers} from '../redux/userSlice'
// import { addUser } from "../redux/userSlice";
// import { updateUser } from "../redux/userSlice";


const UserProfile = ({uu}) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(false); 

  let { tweets } = useSelector(selectTweets);
  tweets=tweets.tweets

console.log(uu)
debugger
//   const array= useSelector(state => state.user)
//   let { user} = array;
//    user= user[0];
//   debugger
//   console.log(user)

  useEffect(() => {
     dispatch(fetchUserTweets());
    //  dispatch(addUser())
  }, [dispatch]);


//   const CONFIG_OBJ={
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":"Bearer "+localStorage.getItem("token")
//     }
//   }
// Function to handle follow/unfollow
const toggleFollow = () => {
    // Toggle follow status
    const newFollowStatus = !isFollowing;
    let u="64b8d98284dc0844b123bdaf"

    // Choose the appropriate API endpoint based on follow status
    const apiEndpoint = newFollowStatus
      ? `http://localhost:3000/user/${u}/follow`
      : `http://localhost:3000/user/${u}/unfollow`;

    // Update follow status on the server
    axios.post(apiEndpoint)
      .then(() => {
        setIsFollowing(newFollowStatus);
      })
      .catch((error) => {
        console.error("Error toggling follow:", error);
      });
  };
 

  return (
    <>
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
                    onClick={toggleFollow}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>

              </div>
            </div>

            <div className="details-list">
              <div className="name">
                <h5>name</h5>
                <p>@username</p>
              </div>
              <div className="dob">
                <div className="dob-box">
                  <p>
                    <i class="fa-solid fa-calendar-days"></i>dob
                  </p>
                </div>
                <div className="dob-box">
                  <i class="fa-sharp fa-solid fa-location-dot"></i>{" "}
                 locatin
                </div>
              </div>
            </div>

            <div className="fans-list">

              <div className="follow">
              <p>7 followers</p>  
              </div>
              <div className="follow">
                <p>4 following</p>
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
    </>
  );
};

export default UserProfile;
