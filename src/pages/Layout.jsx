import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getLoggedInUser, logout } from "../redux/auth/authSlice";
import { ACCESS_TOKEN } from "../constants";
import { useState } from "react";
import Logout from "./user/Logout";

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getLoggedInUser);
  const [show, setShow] = useState(false);

  const handleShowModalLogout = () => {
    setShow(true);
  };

  const handleHideModalLogout = () => {
    setShow(false);
  };

  const handleLogout = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    dispatch(logout(accessToken));
    navigate("/login");
    setShow(false);
  };

  return (
    <div>
      {user?.email ? (
        <>
          <header
            style={{
              backgroundColor: "#262933",
              padding: "30px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Link
                style={{
                  color: "#262933",
                  padding: 10,
                  display: "flex",
                  gap: 10,
                  fontSize: 20,
                  alignItems: "center",
                  backgroundColor: "#f1ebeb",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                to={user ? "/" : "/login"}
              >
                <span>Home</span>
                <div className="fa-solid fa-house"></div>
              </Link>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 30,
                }}
              >
                {user?.role === "admin" && (
                  <>
                    <Link
                      style={{
                        color: "#262933",
                        padding: 10,
                        display: "flex",
                        gap: 10,
                        fontSize: 20,
                        alignItems: "center",
                        backgroundColor: "#f1ebeb",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      to="/admin"
                    >
                      <span>Edit Movie</span>
                      <div className="fa-solid fa-pen-to-square"></div>
                    </Link>
                  </>
                )}
                <div
                  style={{
                    color: "#262933",
                    padding: 10,
                    display: "flex",
                    gap: 10,
                    fontSize: 20,
                    alignItems: "center",
                    backgroundColor: "#f1ebeb",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={handleShowModalLogout}
                >
                  <span>Logout</span>
                  <button
                    style={{
                      cursor: "pointer",
                      fontSize: 20,
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                    className="fa-solid fa-right-from-bracket"
                  ></button>
                </div>
              </div>
            </div>
          </header>
        </>
      ) : (
        <></>
      )}
      {show ? (
        <Logout
          handleLogout={handleLogout}
          handleHideModalLogout={handleHideModalLogout}
        />
      ) : (
        <></>
      )}

      <main
        style={{
          padding: 20,
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;