import { useState } from 'react'

const useForm = () => {
    const [state, setState] = useState({})

    const handleChange = (e) => {
        setState(prev => (
            { ...prev, [e.target.name]: e.target.value }
        ))
    }
    const disabled =
        !state.username?.length ||
        !state.email?.length ||
        !state.password?.length ||
        !state.re_password?.length;

    return [state, handleChange, disabled]
}

export default useForm