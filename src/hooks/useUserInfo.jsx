import {useEffect} from 'react'
import { checkAuthenticated, load_user } from "../redux/asyncActions/UserAsync";
import { useDispatch,useSelector } from 'react-redux'


const useUserInfo = () => {
    const userInfo = useSelector(state => state.userReducer)
    const user = userInfo.user
    const isAuthenticated = userInfo.isAuthenticated
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(load_user())
        dispatch(checkAuthenticated());
    }, [dispatch])
   
    return {user,isAuthenticated}
}

export default useUserInfo
