import React,{useEffect,useState} from 'react'
import { load_user } from "../redux/asyncActions/UserAsync";
import { useDispatch,useSelector } from 'react-redux'


const useUserInfo = () => {
    const userInfo = useSelector(state => state.userReducer)
    const user = userInfo.user
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(load_user())
    }, [])
   
    return {user}
}

export default useUserInfo
