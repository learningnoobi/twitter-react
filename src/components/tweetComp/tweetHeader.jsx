import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showSidebar } from '../../redux/slices/simpleState'
const TweetHeader = () => {
  const dispatch = useDispatch()
  const openNav = () => {
    
  }
    return (
        <div className="tweet-header">
        <h4>Home</h4>
        <button className="btns" onClick={()=>dispatch(showSidebar("sidebar"))}>☰ </button>
      </div>
    )
}

export default TweetHeader
