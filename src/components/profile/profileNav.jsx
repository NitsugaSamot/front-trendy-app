
import { NavLink } from 'react-router-dom'
import imageLogo from '../../assets/trendy-spot-logo.png'
import './profileStyles.css'

const ProfileNav = () => {
  return (
    <>
        <nav className='profileNav'>
            <NavLink className='navLink' to="/logged_in">
                <img src={imageLogo} alt="logo-home" className="logoHomeProfile" />
            </NavLink>

          
            <NavLink className='navLink' to="/logged_in/changue-password">
                <p className='p-nav'>Changue Password</p>
            </NavLink>
            
           
            <NavLink className='navLink' to="/logged_in/edit-profile">
                <p className='p-nav'>Edit Profile</p>
            </NavLink>
        </nav>
    
    </>
  )
}

export default ProfileNav