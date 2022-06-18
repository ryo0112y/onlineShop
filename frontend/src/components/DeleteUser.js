import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
const DeleteUser = () => {

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const deleteUser = () =>{
      axios.delete("/user/delete/" + id)
      .then(response =>{
          console.log("delted the user");
          window.location.href = "/users";
      })
      .catch(err =>{
        alert("This user can not delete, Check the order list")
      })
  }

  const Loading = () => {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  };

  const ShowUser = () => {
    return (
      <div className="card mt-5 text-center">
        <div className="card-body">
          <h5 className="card-title">
            {userData.firstName} {userData.lastName}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {">>"}username: <strong>{userData.username}</strong>
          </h6>
          <p className="card-text fw-lighter text-decoration-underline text-danger">
            If you delete the user, you will never get back him
          </p>
          <Link
            className="btn btn-info me-2"
            to={`/users`}
          >
            Cancel
          </Link>
          <Button
            className="btn btn-danger me-2"
            onClick={deleteUser}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return <>{loading ? <Loading /> : <ShowUser />}</>;
};

export default DeleteUser;
