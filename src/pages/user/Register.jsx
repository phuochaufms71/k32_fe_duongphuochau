import { Spin } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/authSlice";
import './Register.scss';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
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
    fontSize: 18
  }}>Loading <Spin style={{marginLeft: 5}} size="medium" /></div>) : (
    <section className="card">
      <div>
        <h1 className="title">Create a new account</h1>
        <form onSubmit={handleRegister}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="input"
              autoFocus
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="input" 
              value={formData.password} 
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          <button className="btn-register" type="submit">Register</button>
          <p className="account">You have an account?<Link className="link-login" to={"/login"}>Login</Link></p>
        </form>
      </div>
    </section>
  )
}

export default Register;
