import React,{useState} from "react";
import { Link } from "react-router-dom";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSmile,
  AiOutlineSchedule,
  AiOutlineBarChart,
} from "react-icons/ai";
const AddTweet = () => {
  const [tweetInput, setTweetInput] = useState('')
  const [showEmoji, setShowEmoji] = useState('none')
  const addEmoji = (emoji) => {
    // console.log(emoji.native)
    setTweetInput(prev => prev + emoji.native)
  }
  const showEmojiFunc = () => {
   if(showEmoji === "none"){
     setShowEmoji("block")
   }
   if(showEmoji === "block"){
     setShowEmoji("none")
   }
  }
  return (
    <div className="add-tweet">
      <span className="add-tweet-image">
        <Link>
          <img
            alt="img"
            src="https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc"
            className="rounded-circle profile-image"
            width="60px"
            height="60px"

          />
        </Link>
      </span>
      <div className="add-tweet-input">
       
          <textarea
            type="text"
            rows="3"
            value={tweetInput}
            onChange={e=>setTweetInput(e.target.value)}
            cols="50"
            placeholder=" What's happening ?"
          ></textarea>
        
        <div>
       
          <ul className="add-tweet-icon">
            <div className="add-icon">
              <li className="side-icon">
                <AiOutlinePicture />
              </li>
              <li className="side-icon">
                <AiOutlineSmile onClick={showEmojiFunc}/>
              </li>
              <li className="side-icon">
                <AiOutlineBarChart />
              </li>
              <li className="side-icon">
                <AiOutlineGif />
              </li>
              <li className="side-icon">
                <AiOutlineSchedule />
              </li>
            </div>

            <li className="link-tweet">
              <span>Tweet</span>
            </li>
          </ul>
          <Picker 
          set='twitter' 
          showPreview={true}
          onSelect={addEmoji}
          style={{
            position:'absolute',
            marginTop:-18,
            display:`${showEmoji}`,
            zIndex:10
        }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
