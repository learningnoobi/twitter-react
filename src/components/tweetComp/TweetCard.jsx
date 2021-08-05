import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import DropDown from "./DropDown";
const TweetCard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef();
  const showDropdown = () => {
    setIsMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={ref} className="actual-tweet">
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
        <FiMoreHorizontal
          onClick={showDropdown}
          style={{
            position: "absolute",
            right: 10,
            // top: 5,
            color: "gray",
            fontSize: 23,
            cursor: "pointer",
          }}
        />
        {isMenuOpen && <DropDown />}
        <p>This is the detail</p>
        <img
          alt="img"
          src="https://qph.fs.quoracdn.net/main-qimg-92e5c1d46505b34638aafd281449dabc"
          className="image"
        />
      </div>
    </div>
  );
};

export default TweetCard;
