import React, { useEffect } from 'react'
import Second from '../components/Second'
import TweetHeader from '../components/TweetComponents/tweetHeader'
import {useDispatch,useSelector} from 'react-redux'
import { bookmark_list } from '../redux/asyncActions/TweetAsync'
import ClipLoader from "react-spinners/ClipLoader";
import TweetPostCard from '../components/TweetComponents/TweetPostCard'
import { removeMesage } from '../redux/slices/tweetSlice'
import AlertMessage from "../components/SmallComponent/alertMessage";

const BookmarkList = () => {
    const dispatch = useDispatch();
    const tweetsInfo = useSelector((state) => state.tweetReducer);
    const message = tweetsInfo.message
    useEffect(()=> {
        dispatch(bookmark_list())
    },[dispatch])
    message &&
    setTimeout(() => {
      dispatch(removeMesage());
    }, 3000);
    return (
       <Second>
         {message && (
          <AlertMessage
            removeMesage={removeMesage}
            dispatch={dispatch}
            message={message}
          />
        )}
           <TweetHeader headerName="Your Bookmark"/>
          {
              tweetsInfo && tweetsInfo.isLoading ? (
                <span className="d-flex justify-content-center mt-4">
                  <ClipLoader color="#f44" loading={true} size={23} />
                </span>
              ) : (
                  tweetsInfo?.bookmarksList.length <1 ? 
                  <h4 className="text-center mt-4">Add Bookmark to be here !</h4>:
                tweetsInfo.bookmarksList.map((tweet) => (
                  <TweetPostCard  dispatch={dispatch} tweet={tweet} key={tweet.id} />
                ))
              )
          }
       </Second>
    )
}

export default BookmarkList
