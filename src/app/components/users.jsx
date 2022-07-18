import React from "react";
import { useState } from "react";
import api from "../api";
import Bookmark from "./bookmark";
import renderPhrase from "./phrase";
import renderQualities from "./qualitie";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  let handleDelete = (userId) => {
    let newUser = users.filter(user=>user._id !== userId)
    
    setUsers(newUser)
  };

  const isHasUsers = users.length > 0;
  const getBadgeClasses = (isHasUsers) => {
    let classes = "badge fw-bold d-inline-block mt-2 p-2 m-2 text-white ";
    return isHasUsers ? classes + "bg-primary" : classes + "bg-danger";
  };

  const handleCheckOnChange = (id, value) => {
    const newUsers = users.map(user => {
      if (user._id === id) {
        return ({...user,bookmark: value})
      }
      return user;
    })
    setUsers(newUsers)
  }

  let userParams = users.map((item) => {
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
            text={item.name}
            value={item.bookmark}
            onChange={handleCheckOnChange}
          />
        </td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
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
    </>
  );
};
export default Users;
