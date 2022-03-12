import { useAppContext } from "../context/appContext"
import { useEffect } from "react"
import Loading from "./Loading"
import Work from "./Work"
import Wrapper from "../assets/wrappers/JobsContainer"
import PageBtnContainer from "./PageBtnContainer"

const WorkContainer = () => {
    const {getWork,works,isLoading,numOfPages,totalwork,search,searchStatus,searchType,sort,page}=useAppContext()
    useEffect(()=>{
        getWork()
        // eslint-disable-next-line
    },[search,searchStatus,searchType,sort,page])
 if(isLoading){
     return <Loading center/>
 }
 if(works.length===0){
     return(
         <Wrapper>
             <h2>No Work to display</h2>
         </Wrapper>
     )
}
return (
    <Wrapper>
        <h5>{totalwork} work{works.length > 1 && 's'} found</h5>
        
        <div className="jobs">
            {works.map((work)=>{
               return <Work key={work._id} {...work}/>
            })}
        </div>
        {numOfPages >1 && <PageBtnContainer/>}
    </Wrapper>
)
}

export default WorkContainer