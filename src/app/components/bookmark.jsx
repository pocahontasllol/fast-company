// import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";

import PropTypes from "prop-types";
const Bookmark = ({ value, id, onClick }) => {
  const [checked, setChecked] = useState(value ?? false);

  const handleClick = () => {
    const newChecked = !checked;

    if (onClick) {
      onClick(id, newChecked);
    }
    setChecked(newChecked);
  };
  return (
    <>
      <button className="btn btn-sm btn-light m-2" onClick={handleClick}>
        <i
          className={checked ? "p-1 bi bi-bookmark-fill" : "p-1 bi bi-bookmark"}
        />
      </button>
    </>
  );
};

Bookmark.propTypes = {
  value: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
export default Bookmark;
