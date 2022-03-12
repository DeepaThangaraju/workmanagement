import {useEffect} from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer,Loading,ChatsContainer } from '../../components'

const Stats = () => {
  const {showStats,isLoading,monthlyWork}=useAppContext()

  useEffect(()=>{
    showStats()
     // eslint-disable-next-line
  },[])

  if(isLoading){
    return <Loading center/>
  }
  return (
    <>
    <StatsContainer/>
    {monthlyWork.length>0 && <ChatsContainer/>}
    </>
  )
}

export default Stats