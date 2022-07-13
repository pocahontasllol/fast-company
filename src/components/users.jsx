import React from "react";
import { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  let handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId));
  };

  const renderPharse = (number) => {
    const phrase = [
      " человек тусанет",
      " человека тусанут",
      " человек тусанет",
    ];
    let cases = [2, 0, 1, 1, 1, 2];
    return number
      ? number +
          phrase[
            number % 100 > 4 && number % 100 < 20
              ? 2
              : cases[number % 10 < 5 ? number % 10 : 5]
          ] +
          " с тобой сегодня"
      : " Никто  не тусанет с тобой сегодня";
  };

const isHasUsers = users.length > 0
const getBadgeClasses = (isHasUsers) => {
  let classes = "badge fw-bold d-inline-block mt-2 p-2 m-2 text-white "
  return isHasUsers ? classes + "bg-primary" : classes + "bg-danger"  
}

  const renderQualities = (qualities) => {
    return qualities.map((quality) => {
      return (
        <span
          key={quality._id}
          className={`badge m-1 bg-${quality.color}`}
        >
          {quality.name}
        </span>
      );
    });
  };
  let userParams = users.map((item) => {
    return (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{renderQualities(item.qualities)}</td>
        <td>{item.profession.name}</td>
        <td>{item.completedMeetings}</td>
        <td>{item.rate}</td>
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
      <h3><span className={getBadgeClasses(isHasUsers)}>{renderPharse(users.length)}</span></h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретились,раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>{userParams}</tbody>
      </table>
    </>
  );
};
export default Users;
