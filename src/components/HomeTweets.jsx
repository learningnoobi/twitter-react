import React from 'react'
import Second from './Second'
import AddTweet from './tweetComp/AddTweet'
import TweetCard from './tweetComp/TweetCard'
import TweetHeader from './tweetComp/tweetHeader'

const HomeTweets = () => {
    return (
     <Second>
         <TweetHeader headerName="Home"/>
         <AddTweet />
         <TweetCard />
     </Second>
    )
}

export default HomeTweets
