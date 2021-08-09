import React,{useEffect,useState} from 'react'
import { load_user } from "../redux/asyncActions/UserAsync";
import { useDispatch,useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar';
import Second from '../components/Second';

const Profile = () => {
    const userInfo = useSelector(state => state.userReducer)
    const user = userInfo.user
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(load_user())
    }, [])
   
    return (
        <div>
            <Sidebar />
            <Second>
                {user && user.email}
            </Second>
            
            
        </div>
    )
}

export default Profile
