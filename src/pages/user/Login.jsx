import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import Spin from "../../components/components/Spin/Spin";
import './Login.scss'

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('password');
  const [eye, setEye] = useState('fa-eye-slash') 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await dispatch(
      login({
        ...formData,
      })
    );
    if (data?.payload) {
      navigate("/");
    }
    setLoading(false);
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
        fontSize: 18,
        color: '#2e6054',
        fontWeight: 600
      }}
    >
      Loading <Spin />
    </div>
  ) : (
    <section className="card">
      <div className="card-inner">
        <h1>Welcome</h1>
        <p className="icon fa-solid fa-unlock-keyhole"></p>
        <h2 className="title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              autoFocus
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              className="input"
              type={`${type}`}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div onClick={() => {setEye(eye === 'fa-eye-slash' ? 'fa-eye' : 'fa-eye-slash'); setType(type === 'password' ? 'text' : 'password')}} className={`fa-solid ${eye}`}></div>
          </div>
          <button className="btn-login" type="submit">
            Login
          </button>
          <p className="not-account">
            You have not an account?
            <Link className="link-register" to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
