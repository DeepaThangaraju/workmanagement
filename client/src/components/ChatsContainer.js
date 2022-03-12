import React,{useState} from "react"

import  BarChartComponent from "./BarChart"
import AreaChartComponent from "./AreaChart"
import {useAppContext} from "../context/appContext"
import Wrapper from "../assets/wrappers/ChartsContainer"

const ChatsContainer = () => {
  const [barChart,setBarChart]=useState(true)
  const {monthlyWork:data}=useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Work</h4>
      <button type="button" onClick={()=>setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? < BarChartComponent data={data}/> : <AreaChartComponent data={data}/>}
    </Wrapper>
  )
}

export default ChatsContainer