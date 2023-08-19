
import { NavLink } from 'react-router-dom'

const Profile = () => {
  return (
    <>


        <div>
            <NavLink to="/logged_in">
                <p>Home</p>
            </NavLink>

          
            <NavLink to="/logged_in/changue-password">
                <p>Changue Password</p>
            </NavLink>
            
           
            <NavLink to="/logged_in/edit-profile">
                <p>Edit Profile</p>
            </NavLink>
        </div>
    
    </>
  )
}

export default Profile