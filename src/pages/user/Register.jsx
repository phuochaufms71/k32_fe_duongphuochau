import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/authSlice";
import Spin from "../../components/components/Spin/Spin";
import './Register.scss';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('password');
  const [eye, setEye] = useState('fa-eye-slash')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(register({ ...formData }))
    if (data?.payload) {
      navigate('/login')
    }
    setLoading(false);
  }

  return loading ? (<div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    translate: '-50% -50%',
    fontSize: 20
  }}>Loading <Spin /></div>) : (
    <section className="card">
      <div className="card-inner">
        <h1>Welcome</h1>
        <p className="icon fa-solid fa-user"></p>
        <h2 className="title">Register</h2>
        <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="input"
                autoFocus
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                className="input" 
                type={`${type}`}
                placeholder="Password"
                value={formData.password} 
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <div onClick={() => {setEye(eye === 'fa-eye-slash' ? 'fa-eye' : 'fa-eye-slash'); setType(type === 'password' ? 'text' : 'password')}} className={`fa-solid ${eye}`}></div>
            </div>
          <button className="btn-register" type="submit">Register</button>
          <p className="account">You have an account?<Link className="link-login" to={"/login"}>Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Register;
