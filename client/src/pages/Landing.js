import React from 'react'
import { Logo } from '../components/index'
import main1 from "../assets/images/main1.svg"

import Wrapper from '../assets/wrappers/Testing'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <Wrapper>
        <nav>
              <Logo/>  
              <h2 className='logo-text'>Work Manager</h2>  
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>Work <span>manager</span> app</h1>
           
            <p>
                In this app we can manage the work more efficiently. 
                Track the work to manage time. Lots of features are here ih this app. Lets start a life with this WM app
            </p>
            <Link to="/register" className='btn btn-hero'>Login/Register</Link>

        </div>
       
        <img src={main1} alt="Management" className='img main-img' ></img>
       
        </div>
    </Wrapper>
  )
}

