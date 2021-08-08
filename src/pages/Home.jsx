import React,{useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Second from '../components/Second'
import {useHistory} from 'react-router-dom'
import { checkAuthenticated } from '../redux/slices/userSlice'
import { useDispatch ,useSelector} from 'react-redux'
const Home = () => {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(checkAuthenticated())
    }, [])
    if(isAuthenticated===false){
        history.push('/login')
    }
    return (
        <div>
            <Sidebar />
            <Second />
        </div>
    )
}

export default Home
