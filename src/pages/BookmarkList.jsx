import React, { useEffect } from 'react'
import Second from '../components/Second'
import TweetHeader from '../components/tweetComp/tweetHeader'
import {useDispatch,useSelector} from 'react-redux'
import { bookmark_list } from '../redux/asyncActions/TweetAsync'
import ClipLoader from "react-spinners/ClipLoader";
import TweetPostCard from '../components/tweetComp/TweetPostCard'

const BookmarkList = () => {
    const dispatch = useDispatch();
    const tweetsInfo = useSelector((state) => state.tweetReducer);
    useEffect(()=> {
        dispatch(bookmark_list())
    },[])
    return (
       <Second>
           <TweetHeader headerName="Your Bookmark"/>
          {
              tweetsInfo && tweetsInfo.isLoading ? (
                <span className="d-flex justify-content-center mt-4">
                  <ClipLoader color="#f44" loading={true} size={23} />
                </span>
              ) : (
                  tweetsInfo.tweets.length <1 ? 
                  <h4 className="text-center mt-4">Add Bookmark to be here !</h4>:
                tweetsInfo.tweets.map((tweet) => (
                  <TweetPostCard  dispatch={dispatch} tweet={tweet} key={tweet.id} />
                ))
              )
          }
       </Second>
    )
}

export default BookmarkList
