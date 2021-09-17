import React,{useEffect} from 'react'
import Second from './Second'
import AddTweet from './tweetComp/AddTweet'
import TweetCard from './tweetComp/TweetCard'
import TweetHeader from './tweetComp/tweetHeader'

const HomeTweets = () => {
    useEffect(()=> {
        window.$('[data-toggle="tooltip"]').tooltip(); 
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
