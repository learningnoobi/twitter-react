import React,{useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Second from '../components/Second'
import {useHistory} from 'react-router-dom'
import { checkAuthenticated } from "../redux/asyncActions/UserAsync";
import { useDispatch ,useSelector} from 'react-redux'
import HomeTweets from '../components/HomeTweets';

import { load_tweet } from '../redux/asyncActions/TweetAsync';
const Home = (props) => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
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
            
        </div>
    )
}

export default Home
