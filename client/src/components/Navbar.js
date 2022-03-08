import Wrapper from "../assets/wrappers/Navbar"
import { useState } from "react"
import {FaAlignLeft,FaUserCircle,FaCaretDown} from "react-icons/fa"
import { useAppContext } from "../context/appContext"
import { useHistory } from "react-router-dom"

const Navbar = () => {
  const {user,toggleSidebar,logoutUser}=useAppContext()
  const [showLogout,setShowLogout]=useState(false)
  const history=useHistory()
  return (
    <Wrapper>
     <div className="nav-center">
       <button type="button" className="toggle-btn" onClick={toggleSidebar}>
       <FaAlignLeft/>
        </button>
        
        <div>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={()=>setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown/>
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={()=>{logoutUser();history.push("/landing")}}>
              Logout
            </button>
          </div>
        </div>
       </div>
    </Wrapper>
  )
}

export default Navbar