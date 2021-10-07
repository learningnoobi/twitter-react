import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { AiOutlineSmile } from "react-icons/ai";

const AddPicker = ({ setInput,classNem='' }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji.native);
  };
  return (
    <div>
      <span className="side-icon mx-2">
        <AiOutlineSmile onClick={() => setShowEmoji(!showEmoji)} />
      </span>
      {showEmoji && (
        <div className={`picker-class ${classNem}`}>
          <Picker
            set="twitter"
            showPreview={true}
            onSelect={addEmoji}
            style={{
              // position: "absolute",
              // marginTop:28,
              // marginLeft:-200,
              display: `${showEmoji}`,
              // zIndex: 10,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddPicker;
