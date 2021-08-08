import React from 'react'
import {BiUserPlus,BiEditAlt,BiBlock} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
const DropDown = () => {
    return (
        <div className="dropdownMenu">
            <p><BiUserPlus /> <span>Unfollow Rayon</span></p>
            <p><BiBlock /><span>Block</span></p>
            <p><AiOutlineDelete /><span>Delete Post</span></p>
            <p><BiEditAlt /><span>Edit Post</span></p>
        </div>
    )
}

export default DropDown
