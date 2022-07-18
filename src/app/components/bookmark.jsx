// import { click } from "@testing-library/user-event/dist/click";
import React, { useState } from "react";

const Bookmark = (props) => {
  const { value, id, onChange } = props;
  const [checked, setChecked] = useState(value ?? false);

  const handleCheckedChange = () => {
    const newChecked = !checked;

    if (onChange) {
      onChange(id, newChecked);
    }
    setChecked(newChecked);
  };
  return (
    <>
      <button className="btn btn-sm btn-light m-2">
        <i
          type="checkbox"
          className={checked ? 'p-1 bi bi-bookmark-fill' : 'p-1 bi bi-bookmark'}
          id={id}
          checked={checked}
          onClick={handleCheckedChange}
        />
      </button>

      <label htmlFor={id}></label>
    </>
  );
};

export default Bookmark;
