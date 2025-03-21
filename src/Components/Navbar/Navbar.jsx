import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/Operations/authAPI';
import ProfileDropdown from './ProfileDropdown';

function Navbar() {
  // Access token from Redux state
  const token = useSelector((state) => state.auth.token); // Assuming token is in state.auth.token

  // Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handling logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className='flex h-[10vh] 
    fixed top-0 bg-white
    items-center justify-center border-b-2 border-slate-200 p-3 w-full z-10'>
      <div className='w-11/12 flex items-center justify-between '>
        <Link to={token ? 'dashboard/my-profile' : '/'}>
          <h1 className='text-blue-700 font-bold text-2xl sm:text-3xl'>SpeakUp</h1>
        </Link>

        {/* Navigation links */}
        <nav className='flex items-center'>
          <div className='flex gap-4 text-slate-700 font-semibold'>
            {!token && (
              <>
                <div>
                  <NavLink 
                    to='/' 
                    className={({ isActive }) => isActive ? "text-blue-700 underline underline-offset-4" : "text-slate-700"}
                  >
                    HOME
                  </NavLink>
                </div>
                <div>
                  <NavLink 
                    to='/about' 
                    className={({ isActive }) => isActive ? "text-blue-700 underline underline-offset-4" : "text-slate-700"}
                  >
                    ABOUT
                  </NavLink>
                </div>
                <div>
                  <NavLink 
                    to='/contact' 
                    className={({ isActive }) => isActive ? "text-blue-700 underline underline-offset-4" : "text-slate-700"}
                  >
                    CONTACT
                  </NavLink>
                </div>
              </>
            )}

            {!token && (
              <>
                <div>
                  <NavLink 
                    to='/login' 
                    className={({ isActive }) => isActive ? "text-blue-700 underline underline-offset-4" : "text-slate-700"}
                  >
                    LOGIN
                  </NavLink>
                </div>
                <div>
                  <NavLink 
                    to='/signup' 
                    className={({ isActive }) => isActive ? "text-blue-700 underline underline-offset-4" : "text-slate-700"}
                  >
                    SIGNUP
                  </NavLink>
                </div>
              </>
            )}

            {token && (
              <>
                <ProfileDropdown />
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
