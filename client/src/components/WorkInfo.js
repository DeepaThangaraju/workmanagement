import Wrapper from "../assets/wrappers/JobInfo"

const WorkInfo = ({icon,text}) => {
  return (
    <Wrapper>
        <span className="icon">{icon}</span>
        <span className="text">{text}</span>
    </Wrapper>
  )
}

export default WorkInfo