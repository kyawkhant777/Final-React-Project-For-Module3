import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Loading from "../common/Loading";

const LogoutIndex = () => {
  const [loading, setLoading] = useState(true);
  let history = useHistory();

  useEffect(() => {

    setTimeout(() => {
      localStorage.clear();
      setLoading(false);
      history.push("/login");
    }, 500);
  }, [history]);

  return (
    <>
      <Loading start={loading} />
    </>
  );
};

export default LogoutIndex;
