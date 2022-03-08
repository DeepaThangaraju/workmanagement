import Wrapper from "../assets/wrappers/BigSidebar"
import { useAppContext } from "../context/appContext"
import NavLinks from "./NavLinks"
import { Logo } from "./Logo"
const BigSidebar = () => {
  const succ=()=>{
    window.location.reload()
    return false;

}
  const {showSidebar}=useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"}>
        <div className="content">
          <header>
            <Logo/>
            <h5 className="logo-text">Work Manager</h5>
          </header>
          <NavLinks />
          
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar