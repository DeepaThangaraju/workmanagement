import moment from "moment"
import { FaLocationArrow,FaBriefcase,FaCalendarAlt } from "react-icons/fa"
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import WorkInfo from "./WorkInfo";

const Work = ({_id,work,workLocation,workType,createdAt,status}) => {

    const {setEditWork,deleteWork}=useAppContext();

    let date=moment(createdAt)
    date=date.format('MMM Do, YYYY')
  return (
     <Wrapper>
         <header>
             <div className="main-icon">{work.charAt(0)}</div>
             <div className="info">
                 <h5>{work}</h5>
             </div>
         </header>
         <div className="content">
             <div className="content-center">
                 <WorkInfo icon={<FaLocationArrow/>} text={workLocation}/>
                 <WorkInfo icon={<FaCalendarAlt/>} text={date}/>
                 <WorkInfo icon={<FaBriefcase/>} text={workType}/>
                 <div className={`status ${status}`}>{status}</div>
             </div>
             <footer>
                 <div className="actions">
                     <Link to='/addwork' onClick={()=>setEditWork(_id)} className="btn edit-btn">
                         Edit
                    </Link>
                    <button type="submit" className="btn delete-btn" onClick={()=>deleteWork(_id)}>
                        Delete
                    </button>
                 </div>
             </footer>
        </div>
     </Wrapper>
  )
}

export default Work