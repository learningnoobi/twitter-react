import React,{useState,useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import {useHistory} from 'react-router-dom'
import { checkAuthenticated } from "../redux/asyncActions/UserAsync";
import { useDispatch ,useSelector} from 'react-redux'
import HomeTweets from '../components/HomeTweets';
import { load_tweet } from '../redux/asyncActions/TweetAsync';
import { removeMesage } from '../redux/slices/tweetSlice';
import AlertMessage from '../components/alertMessage';


const Home = () => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    const message = useSelector(state => state.tweetReducer.message)
    const dispatch = useDispatch()
    const history = useHistory()
 
    useEffect(() => {
        dispatch(load_tweet())
        dispatch(checkAuthenticated())
        !isAuthenticated && history.push('/login')
    }, [])

    return (
        <div>
            <Sidebar />
            <HomeTweets />
            {message&& <AlertMessage removeMesage={removeMesage} dispatch={dispatch} message={message} />}
        </div>
    )
}

export default Home
