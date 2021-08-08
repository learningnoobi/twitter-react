import React,{useEffect,useState} from 'react'
import { load_user } from '../redux/slices/userSlice'
import { useDispatch,useSelector } from 'react-redux'

const Profile = () => {
    const userInfo = useSelector(state => state.userReducer)
    const user = userInfo.user
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(load_user())
    }, [])
    console.log(user)
    return (
        <div>
            {user? <h2>{user.email}</h2>:'no user'} 
            
            
        </div>
    )
}

export default Profile
