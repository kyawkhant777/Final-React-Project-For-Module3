import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImg,
  CInput,
  CRow,
} from "@coreui/react";
import { useHistory } from "react-router";
import SuccessError from "../../common/SuccessError";
import { ApiRequest } from "../../common/ApiRequest";
import { nullChk, validateName } from "../../common/CommonValidation";

const AdminRegAndListIndex = () => {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState([]);
  const [totalRow, setTotalRow] = useState(""); // for user list table rows
  const [currentPage, setCurrentPage] = useState(); // for user list table current page
  const [lastPage, setLastPage] = useState(""); // for user list table last page
  const [updateID, setUpdateID] = useState("");
  const [loading, setLoading] = useState(false); // For Loading
  const [updateStatus, setUpdateStatus] = useState(false); //for update status
  const [error, setError] = useState([]); // for error message
  const [success, setSuccess] = useState([]); // for success message
  const [total, setTotal] = useState(""); // total rows
  const [adminList, setAdminList] = useState([]);


  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);
    if (flag == "true") {
      console.log("Login process success");
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
      await search();
      setLoading(false);
    })();
  }, []);

  const search = async () => {
    let search = {
      method: "get",
      url: `admin/get`,
    };
    let response = await ApiRequest(search);
    if (response.flag === false) {
      setAdmin([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setAdmin(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        setError([response.data.message]);
        setAdmin([]);
      }
    }
  };
  const userNameChange = (e) => {
    setUserName(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const reset = () => {
    setUserName("");
    setPassword("");
  };

  const saveClick = async () => {
    setLoading(true);
    setUpdateStatus(false);
    let errMsg = [];
    if (!nullChk(userName)) {
      errMsg.push("Please Fill Username");
    } else if (!validateName(userName)) {
      errMsg.push("Please Fill Character Only in Username");
    }
    if (!nullChk(password)) {
      errMsg.push("Please Fill Your Password");
    }
    if (errMsg.length > 0) {
      setError(errMsg);
      setLoading(false);
      return;
    }
    let saveData = {
      method: "post",
      url: `admin/save`,
      params: {
        name: userName,
        password: password,
      },
    };
    let response = await ApiRequest(saveData);
    console.log(response.flag);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setSuccess([]);
    } else {
      if (response.data.status == "OK") {
        setSuccess([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        reset();
        setError([]);
      } else {
        setError([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setSuccess([]);
      }
    }
    setLoading(false);
    if (errMsg.length <= 0) {
    } else {
      setError(errMsg);
    }
  };

  const editClick = async (id) => {
    setLoading(true);
    setUpdateStatus(true);
    setUpdateID(id);
    let saveData = {
      method: "get",
      url: `admin/edit/${id}`,
    };
    let response = await ApiRequest(saveData);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setUserName(response.data.data.name);
        setPassword(response.data.data.password);
        setError([]);
      } else {
        setError([response.data.message]);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
    setLoading(false);
  };

  const delClick = async (deleteId) => {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      setLoading(true);
      let obj = {
        method: "delete",
        url: `admin/delete/${deleteId}`,
      };
      let response = await ApiRequest(obj);
      setLoading(false);

      if (response.flag === false) {
        setSuccess([]);
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status === "OK") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          let page = currentPage;
          setSuccess([response.data.message]);
          if (adminList.length - 1 === 0) {
            page = currentPage - 1;
          }
          search(page);
          setError([]);
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    } else {
    }
  };



  const updateClick = async () => {
    const confirmed = window.confirm("Are you sure you want to Update?");
    setLoading(true);
    setUpdateStatus(false);

    if (confirmed) {
      let saveData = {
        method: "post",
        url: `admin/update/${updateID}`,
        params: {
          name: userName,
          password: password,
        },
      };

      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
      } else {
        if (response.data.status === "OK") {
          setSuccess([response.data.message]);
          reset();
          search();
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    }
    setSuccess([]);
    setLoading(false);
    setUpdateStatus(true);
  };

  return (
    <>
      <CRow>
        <CCol xs="12">
          <SuccessError success={success} error={error} />
          <CCard>
            <CCardHeader>
              <h4
                className="m-0"
                style={{ textAlign: "center", fontWeight: "bolder" }}
              >
                Admin Register Form{" "}
              </h4>
            </CCardHeader>
            <CCardBody>
              <CRow style={{ marginTop: "10px" }}>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className="mt-2">UserName</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput
                        type="text"
                        value={userName}
                        onChange={userNameChange}
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>

                <CCol lg="6">
                  <CRow>
                    <CCol lg="1"></CCol>
                    <CCol lg="3">
                      <p className="mt-2">Password</p>
                    </CCol>
                    <CCol lg="7">
                      <CInput
                        type="password"
                        value={password}
                        onChange={passwordChange}
                      />
                    </CCol>
                    <CCol lg="1"></CCol>
                  </CRow>
                </CCol>
              </CRow>
              <CRow style={{ justifyContent: "center" }} className="mt-4">
                {updateStatus == false && (
                  <CButton className="form-btn" onClick={saveClick}>
                    Save
                  </CButton>
                )}
                {updateStatus == true && (
                  <CButton className="form-btn" onClick={updateClick}>
                    Update
                  </CButton>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h4
                className="m-0"
                style={{ textAlign: "center", fontWeight: "bolder" }}
              >
                Admin List
              </h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  {admin.length > 0 && (
                    <>
                      <p
                        className="mb-0 mr-2 font-weight-bold"
                        style={{ textAlign: "right" }}
                      >
                        Total: {total} row(s)
                      </p>
                      <div className=" table-dark table-hover">
                        <table className="emp-list-table">
                          <thead>
                            <tr>
                              <th className="text-center" width={50}>
                                No
                              </th>
                              <th className="text-center" width={50}>
                                ID
                              </th>
                              <th className="text-center" width={200}>
                                Name
                              </th>
                              <th className="text-center" width={200}>
                                UserCode
                              </th>
                              <th className="text-center" width={200}>
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {admin.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td width={50} className="text-center">
                                    {index + 1}
                                  </td>
                                  <td width={50} className="text-center">
                                    {data.id}
                                  </td>
                                  <td width={50} className="text-center">
                                    {data.name}
                                  </td>
                                  <td width={50} className="text-center">
                                    {data.user_code}
                                  </td>
                                  <td
                                    style={{
                                      border: "1px solid",
                                      padding: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <div
                                      className="user-before"
                                      style={{ marginRight: "20px" }}
                                    >
                                      <CImg
                                        src="/image/Edit-Component-inactive.svg"
                                        onClick={() => {
                                          editClick(data.id);
                                        }}
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                      <CImg
                                        className="user-after"
                                        src="/image/Edit-Component-active.svg"
                                        onClick={() => {
                                          editClick(data.id);
                                        }}
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                    </div>

                                    <div className="user-before">
                                      <CImg
                                        src="/image/Delete-Component-inactive.svg"
                                        onClick={() => delClick(data.id)}
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                      <CImg
                                        className="user-after"
                                        src="/image/Delete-Component-active.svg"
                                        onClick={() => delClick(data.id)}
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          cursor: "pointer",
                                        }}
                                      ></CImg>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </>
                  )}
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <br></br>
    </>
  );
};

export default AdminRegAndListIndex;
