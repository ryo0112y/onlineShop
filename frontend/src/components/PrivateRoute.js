import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocalState } from "../util/useLocalStroge";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    axios.get(`/api/auth/validate?token=${jwt}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }
    ).then((isValid) => {
      setIsValid(isValid.data);
      setIsLoading(false);
      console.log(isValid.data);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
