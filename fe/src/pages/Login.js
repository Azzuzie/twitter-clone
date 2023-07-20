import {React,useState} from 'react'
import "./Login.css"
import Twitter from "../images/twlg.jpg"
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const login = async (e) => {
      e.preventDefault();
      
        const data={email:email,password:password}
        console.log(data)
        await axios.post("http://localhost:4000/login",data)
        .then((result)=>{
          if(result){
            Swal.fire({
              icon:'success',
              title:'User loggedin successfully'
            })
            navigate('/home')
          }
          setEmail('')
          setPassword('')
        })
        .catch((error)=>{
          console.log(error)
          Swal.fire({
            icon:'error',
            title:error.response.data.error
          })
        })
     
    };
  return (
    <div className='container tot-back'>
        <div className='row lg-box'>
            <div className='col-lg-6 col-md-6 col-sm-12'>
                <img src={Twitter} alt='bird' height={400} width={430} className='lg-img'/>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 smal'>
            <h2>Login</h2>
                <form onSubmit={(e)=>login(e)}>
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address :-</label>
                        <input type="email" className="form-control input-bg" placeholder='Email' onChange={(ev) => setEmail(ev.target.value)}/>

                        <label for="exampleInputPassword1" className="form-label">Password :-</label>
                        <input type="password" className="form-control input-bg" placeholder='Password' onChange={(ev) => setPassword(ev.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-info login-btn">Login</button>

                   

                    <div className="mt-3 mb-5 d-grid" >
                            <span className="bot-text">Don't have an account?  <Link to="/signup" className="ms-1 text-info fw-bold"><a href="Signup.js">Register</a></Link></span>
                            
                        
                    </div>
                </form>

            </div>
        </div>
    </div>
  )
}

export default Login