import React,{useEffect} from 'react'
import Second from './Second'
import AddTweet from './tweetComp/AddTweet'
import TweetCard from './tweetComp/TweetCard'
import TweetHeader from './tweetComp/tweetHeader'
import {Redirect,useHistory } from 'react-router-dom'
const HomeTweets = () => {
    const history = useHistory()
    useEffect(()=> {
        window.$('[data-toggle="tooltip"]').tooltip(); 
        window.$('[data-toggle="popover"]').popover();
       if (!localStorage.getItem("access")){
        // <Redirect to="/profile"/>
        history.push('/login')
       }
      },[])
    return (
     <Second>
         <TweetHeader headerName="Home"/>
         <AddTweet />
         <TweetCard />
     </Second>
    )
}

export default HomeTweets
