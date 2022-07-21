// import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";

const Bookmark = ({ value, id, onClick }) => {
  const [checked, setChecked] = useState(value ?? false);


  const handleСlick = () => {
    const newChecked = !checked;

    if (onClick) {
      onClick(id, newChecked);
    }
    setChecked(newChecked);
  };
  return (
    <>
      <button className="btn btn-sm btn-light m-2" onClick={handleСlick}>
      <i className={checked ? 'p-1 bi bi-bookmark-fill' : 'p-1 bi bi-bookmark'} />
    </button>
    </>
  );
};

export default Bookmark;
