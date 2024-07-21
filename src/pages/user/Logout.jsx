/* eslint-disable react/prop-types */
import './Logout.scss';

function Logout({handleLogout, handleHideModalLogout}) {
  return (
    <div className="logout">
      <div className="logout-modal">
          <h3 className="logout-title">You are attempting to log out of the website</h3>
          <p className="logout-sure">Are you sure?</p>
          <hr />
          <div className="logout-action">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <button onClick={handleHideModalLogout} className='logout-cancel'>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default Logout;
