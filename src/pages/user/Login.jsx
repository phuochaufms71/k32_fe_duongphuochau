import { Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import './Login.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(login({
      ...formData
    }))
    if(data?.payload) {
      navigate('/')
    }
    setLoading(false);
  }

  return loading ? (<div style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    translate: '-50% -50%',
    fontSize: 18
  }}>Loading <Spin style={{marginLeft: 5}} size="medium" /></div>) : (
    <section className="card">
        <div>
          <h1 className="title">Login your account?</h1>
          <form onSubmit={handleLogin}>     
            <input 
              className="input" 
              type="email" 
              placeholder="Email" 
              autoFocus 
              value={formData.email} 
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input 
              className="input" 
              type="password" 
              placeholder="Password" 
              value={formData.password} 
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <button className="btn-login" type="submit">Login</button>
              <p className="not-account">
                You have not an account?
                <Link className="link-register" to="/register">Register</Link>
              </p>
          </form>
        </div>
    </section>
  )
}

export default Login;
