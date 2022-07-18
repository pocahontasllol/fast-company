import React from "react";

const renderQualities = (qualities) => {
  // console.log(qualities)
  return qualities.map((quality) => {
    return (
      <span key={quality._id} 
      className={`badge m-1 bg-${quality.color}`}>
        {quality.name}
      </span>
    );
  });
};

export default renderQualities