import React,{useEffect,useState} from 'react'
import { load_user } from "../redux/asyncActions/UserAsync";
import { useDispatch,useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar';
import Second from '../components/Second';
import useUserInfo from '../hooks/useUserInfo';
import {useParams} from 'react-router-dom'
import TweetHeader from '../components/tweetComp/tweetHeader';
const Profile = () => {
    const {username} = useParams()
    const {user} = useUserInfo();
   
    return (
        <div>
            <Sidebar />
            <Second>
                <TweetHeader headerName="profile"/>
              {user && <div>
                  {user.email}
              </div>}
                <h2>User name is {username}</h2>
            </Second>
            
            
        </div>
    )
}

export default Profile
