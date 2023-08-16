
// import { Outlet, Navigate } from "react-router-dom"
import Filter from '../filter/filter'
import Home from '../../views/home/home'
import './styles.css'
import Nav from '../nav/nav'

const ContextUser = () => {
  return (
    <>
      <div className='containerDiv'> 
            <Nav/>
            <Home/>
            {/* <Filter/> */}
      </div>

    </>
  )
}

export default ContextUser