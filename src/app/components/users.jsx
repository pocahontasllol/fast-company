import React, { useState } from "react";
import api from "../api";
import Bookmark from "./bookmark";
import Pagination from "./pagination";
import renderPhrase from "./phrase";
import renderQualities from "./qualitie";
import { paginate } from "../utils/paginate";
// import PropTypes from "prop-types";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  // const [users, setUsers] = useState([])
  const count = users.length;

  const pageSize = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  const handleDelete = (userId) => {
    const newUser = users.filter((user) => user._id !== userId);

    setUsers(newUser);
  };

  const isHasUsers = count > 0;
  const getBadgeClasses = (isHasUsers) => {
    const classes = "badge fw-bold d-inline-block mt-2 p-2 m-2 text-white ";
    return isHasUsers ? classes + "bg-primary" : classes + "bg-danger";
  };

  const handleCheckOnChange = (id, value) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: value };
      }
      return user;
    });
    setUsers(newUsers);
  };

  const userParams = userCrop.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{renderQualities(item.qualities)}</td>
        <td>{item.profession.name}</td>
        <td>{item.completedMeetings}</td>
        <td>{item.rate}</td>
        <td>
          <Bookmark
            key={item._id}
            id={item._id}
            value={item.bookmark}
            onClick={handleCheckOnChange}
          />
        </td>
        <td>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <h2>
        <span className={getBadgeClasses(isHasUsers)}>
          {renderPhrase(users.length)}
        </span>
      </h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретились,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
          </tr>
        </thead>
        <tbody>{userParams}</tbody>
      </table>
      <Pagination
        itemsCounts={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
export default Users;
