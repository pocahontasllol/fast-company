import React, { useState, useEffect } from "react";
import api from "../api";
import Bookmark from "./bookmark";
import Pagination from "./pagination";
import renderPhrase from "./phrase";
import renderQualities from "./qualitie";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    setCurrentPage(1);
  }, selectedProf);
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const [professions, setProfessions] = useState();
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  useEffect(() => {
    api.users.fetchAll().then((users) => setUsers(users));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession === selectedProf)
    : users;
  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const clearFilter = () => {
    setSelectedProf();
  };
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
    <div className="d-flex">
      {professions && (
        <div className="d-flex-column flex-shrink-0 p-3">
          <GroupList
            items={professions}
            onItemSelect={handleProfessionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <h2>
          <span className={getBadgeClasses(isHasUsers)}>
            {renderPhrase(count)}
          </span>
        </h2>
        {count > 0 && (
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
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCounts={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Users;
