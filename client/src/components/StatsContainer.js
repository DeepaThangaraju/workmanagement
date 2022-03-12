import StatsItem from "./StatsItem"
import { useAppContext } from "../context/appContext"
import { FaSuitcaseRolling,FaBug} from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer"


const StatsContainer = () => {

    const {stats}=useAppContext();
    const defaultStats=[
        {
            title:'pending works',
            count:stats.pending || 0,
            icon:<FaSuitcaseRolling/>,
            color:'#e9b949',
            bcg:'#fcefc7'
        },
        {
            title:'finished works',
            count:stats.finished || 0,
            icon:<FaBug />,
            color:'#006400',
            bcg:'#008000'
        }
    ]

  return (
      <Wrapper>
        {defaultStats.map((item,index)=>{
            return <StatsItem key={index} {...item} />
        })}
    </Wrapper>
  )
}

export default StatsContainer