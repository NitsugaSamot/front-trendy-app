
// import { Outlet, Navigate } from "react-router-dom"
import Home from '../home/home'
import './styles.css'
import Nav from '../nav/nav'
// import {perfilUser} from '../perfil-user/perfilUser'

const ContextUser = () => {
  return (
    <>
      <div className='containerDiv'> 
            <Nav/>
            <Home/>
            {/* <perfilUser/> */}

            

      </div>

    </>
  )
}

export default ContextUser