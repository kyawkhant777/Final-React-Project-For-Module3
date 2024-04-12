import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import { checkNullOrBlank, checkPassword } from "../common/CommonValidation";
import Loading from "../common/Loading";
import { ApiRequest } from "../common/ApiRequest";
import $ from "jquery";

const LoginIndex = () => {
  useEffect(() => {
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);
  const [zoomSize, setZoomSize] = useState(
    Math.round(window.devicePixelRatio * 100)
  );
  const history = useHistory();
  const [loading, setLoading] = useState(false); // For Loading
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [userCode, setUserCode] = useState(""); // for shop code
  const [password, setPassword] = useState(""); // for password

  const passwordChange = (e) => {
    setSuccess([]);
    setError([]);
    setPassword(e.target.value);
  };

  const userCodeChange = (e) => {
    setSuccess([]);
    setError([]);
    setUserCode(e.target.value);
  };

  const loginClick = async () => {
    let err = [];
    setLoading(true);
    if (!checkNullOrBlank(userCode)) {
      err.push("Please fill userCode");
    }
    if (!checkNullOrBlank(password)) {
      err.push("Please fill password");
    }
    if (err.length > 0) {
      setSuccess([]);
      setError(err);
      setLoading(false);
    } else {
      setError([]);
      let loginData = {
        method: "get",
        url: `admin/login`,
        params: {
          user_code: userCode,
          password: password,
        },
      };
      let response = await ApiRequest(loginData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
      } else {
        if (response.data.status == "OK") {
          history.push(`/Dashboard`);
          localStorage.setItem(`LoginProcess`, "true");
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
      setLoading(false);
    }
  };
  const keyDownHandler = (e) => {
    if (e.key == "Enter") {
      loginClick();
      e.preventDefault();
    }
  };
  return (
    <>
      <LoginForm
        keyDownHandler={keyDownHandler}
        zoomSize={zoomSize}
        loginClick={loginClick}
        passwordChange={passwordChange}
        password={password}
        userCodeChange={userCodeChange}
        userCode={userCode}
        success={success}
        error={error}
        useEffect={useEffect}
        $={$}

      />
      <Loading start={loading} />
    </>
  );
};

export default LoginIndex;
