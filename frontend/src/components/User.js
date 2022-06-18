import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const User = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState(users);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get("/user/list")
      .then((response) => {
        setUsers(response.data);
        setFilterUsers(response.data);
        console.log("Hello World");
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Loading = () => {
    return (
      <>
        <h1>This page is only available for admin</h1>
      </>
    );
  };

  const deleteStudent = () => {
    console.log("delete");
    axios.delete(`users`);
  };

  const ShowUsers = () => {
    return (
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {filterUsers.map((user) => {
            return (
              <tbody key={user.id}>
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>
                    <Link
                      className="btn btn-info me-2"
                      to={`/users/update/${user.id}`}
                    >
                      Update
                    </Link>
                    <Link
                      className="btn btn-danger me-2"
                      to={`/users/delete/${user.id}`}
                    >
                      delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  };

  const searchUsers = (keyword) => {

    setSearchInput(keyword);

    if(keyword !== ''){
      const results = users.filter((user) =>{
        return Object.values(user).join('').toLowerCase().includes(keyword.toLowerCase());
      })
      setFilterUsers(results);
    }
    else{
      setFilterUsers(users);
    }
  }

  return (
    <div className="container mt-5">
      <div>
        <Row>
          <Col>
            <h1>User List</h1>
          </Col>
          <Col>
            <input icon="search" placeholder="Search by Name..." onChange={(e) => searchUsers(e.target.value)} />
          </Col>
        </Row>
      </div>
      {loading ? <Loading /> : <ShowUsers />}
    </div>
  );
};

export default User;
