import React, { useState } from "react";

const Text = ({ text, color = "#000", fontSize = "1.5rem" }) => {
  const textStyle = {
    color,
    lineHeight: 1.4,
    fontSize,
  };

  const linkStyle = {
    border: "none",
    backgroundColor: "#dee2e6",
    color: "blue",
    cursor: "pointer",
  };

  const [isOpen, setIsOpen] = useState(false);
  //   const [displayText, setDisplayText] = useState(text);

  function getHalfText(text) {
    const midPoint = Math.floor(text.length / 2);
    return text.substr(0, midPoint);
  }

  function handleOpenClose() {
    setIsOpen((open) => !open);
  }

  return (
    <div style={textStyle}>
      {isOpen ? text : getHalfText(text)}
      <button href="#" style={linkStyle} onClick={handleOpenClose}>
        {isOpen ? "...Show Less" : "...Show More"}
      </button>
    </div>
  );
};

export default Text;
