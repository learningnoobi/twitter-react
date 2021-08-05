import React from "react";
import {Link} from 'react-router-dom'

const TweetCard = () => {
  return (
    <div className="actual-tweet">
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
      <div className="tweet-content">
        <Link>Rayon</Link> <span className="side-name">@ Rae | 14 hrs </span>
        <p>This is the detail</p>
        <img alt="img" src="https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc" className="image" />
      </div>
    </div>
  );
};

export default TweetCard;
