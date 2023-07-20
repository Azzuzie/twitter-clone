import {React,useState} from 'react'
import "./Signup.css"
import Twitter from "../images/twlg.jpg"
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigate=useNavigate()
    // const [loading,setLoading]=useState(false)
    const signup = async (e) => {
      e.preventDefault();
      
        const data={username:phone,name:name,email:email,password:password}
        console.log(data)
        axios.post("http://localhost:4000/register",data)
        .then((result)=>{
          if(result){
           
            Swal.fire({
              icon:'success',
              title:'User registered successfully'
            })
            navigate('/login')
          }
          setEmail('')
          setName('')
          setPassword('')
          setPhone('')
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
 
    <>    
    <div className='container tot-back'>
        <div className='row lg-box'>
            <div className='col-lg-6 col-md-6 col-sm-12' >
                <img src={Twitter} alt='bird' height={400} width={430} className='lg-img'/>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
            <h2>Register</h2>
                <form onSubmit={(e)=>signup(e)}>
                    <div className="mb-3">
                        {/* <label for="exampleInputEmail1" className="form-label">Phone :-</label> */}
                        <input type="text" className="form-control input-block" placeholder='Phone'  onChange={(ev) => setPhone(ev.target.value)}/>

                        {/* <label for="exampleInputEmail1" className="form-label">Email address :-</label> */}
                        <input type="email" className="form-control input-block" placeholder='Email' onChange={(ev) => setEmail(ev.target.value)}/>

                        {/* <label for="exampleInputEmail1" className="form-label">Full Name :-</label> */}
                        <input type="text" className="form-control input-block" placeholder='Full Name' onChange={(ev) => setName(ev.target.value)}/>
                    
                        {/* <label for="exampleInputPassword1" className="form-label">Password :-</label> */}
                        <input type="password" className="form-control input-block" placeholder='Password' onChange={(ev) => setPassword(ev.target.value)}/>
                    </div>

                    <button type="submit" className="btn btn-info login-btn">Sign Up</button>

                

                    <div className="mt-3 mb-5 d-grid" >
                            <span className="bot-text">Already have an account?  <Link to="/login" className="ms-1 text-info fw-bold"><a href="Signup.js">Login</a></Link></span>
                           
                        
                    </div>
                </form>

            </div>
        </div>
    </div>
    </>
  )
}

export default Signup