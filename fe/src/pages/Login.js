import {React, useState} from 'react';
import './Login.css'
import {  toast } from 'react-toastify';
import axios from 'axios';
import Twitter from "../images/twlg.jpg"
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addUser} from '../redux/userSlice'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email: email, password: password };
    // console.log(data);
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    toast.promise(
      promise,
      {
        pending: 'Loading...'
      },
    );

    promise
      .then(() => {
        setLoading(false);
        axios.post('http://localhost:4000/login', data)
          .then((result) => {
            if (result) {
              localStorage.setItem("token",result.data.result.token)
              localStorage.setItem("user",JSON.stringify(result.data.result.user))
              
              toast.success('Login Successful!');
              
              navigate('/home')
            }
            setEmail('')
            setPassword('')
          })
          .then(()=>{
            const user=JSON.parse(localStorage.getItem("user"))
            dispatch(addUser(user))
          })
          .catch((error) => {
            toast.error(error.response.data.error);
            // dispatch(removeUser())
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className='container tot-back'>
      <div className='row lg-box'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <img src={Twitter} alt='bird' height={400} width={430} className='lg-img'/>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12 smal'>
          <h2>Login</h2>
          <form onSubmit={(e) => login(e)}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Email address :-</label>
              <input type="email" className="form-control input-bg" placeholder='Email' onChange={(ev) => setEmail(ev.target.value)}/>

              <label for="exampleInputPassword1" className="form-label">Password :-</label>
              <input type="password" className="form-control input-bg" placeholder='Password' onChange={(ev) => setPassword(ev.target.value)}/>
            </div>

            <button type="submit" className="btn btn-info login-btn" disabled={loading}>Login</button>

           

            <div className="mt-3 mb-5 d-grid" >
                <span className="bot-text">Don't have an account?  <Link to="/signup" className="ms-1 text-info fw-bold"><a href="Signup.js">Register</a></Link></span>
                
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
