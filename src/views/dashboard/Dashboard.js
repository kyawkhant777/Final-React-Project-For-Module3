import React, { useState, useEffect,lazy } from "react";
import { useHistory } from "react-router";
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CProgress,
  CCardFooter,
  CButton,
} from "@coreui/react";
import { ApiRequest } from "../common/ApiRequest";
import CIcon from "@coreui/icons-react";
import MainChartExample from "../charts/MainChartExample.js";

const Dashboard = () => {
  const [admin, setAdmin] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState([]);
  const [selectGender, setSelectGender] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const history = useHistory();
  const [error, setError] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [lastPage, setLastPage] = useState("");
  const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
  const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

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

  useEffect(() => {
    let flag = localStorage.getItem(`LoginProcess`);
    if (flag == "true") {
      console.log("Login process success");
    } else {
      history.push(`/Login`);
    }

    (async () => {
      setLoading(true);
      await employeeSearch();
      setLoading(false);
    })();
  }, []);

  let search = async () => {
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
  const employeeSearch = async (page = 1) => {
    setError([]);
    let employeeSearch = {
      method: "get",
      url: `employee/search?page=${page}`,
      params: {
        name: userName,
        gender: selectGender,
      },
    };
    let response = await ApiRequest(employeeSearch);
    if (response.flag === false) {
      setEmployeeList([]);
      setError(response.message);
    } else {
      if (response.data.status === "OK") {
        setEmployeeList(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        setError([response.data.message]);
        setEmployeeList([]);
      }
    }
  };

  return (
    <>
    <WidgetsDropdown />
      <CRow className="mt-3">
        <CCol lg="12">
          <CCard>
            <CCardHeader>
              <h4 className="m-0" style={{ textAlign: "center",  fontWeight:"bolder"}}>Admin List</h4>
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
                        Total: {admin.length} row(s)
                      </p>
                      <div className="overflow">
                        <table className="table table-dark table-borderless">
                          <thead>
                            <tr>
                              <th className="text-center" width={100}>
                                No
                              </th>
                              <th className="text-center" width={100}>
                                ID
                              </th>
                              <th className="text-center" width={250}>
                                Name
                              </th>
                              <th className="text-center" width={250}>
                                UserCode
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

      <CRow className="mt-3">
        <CCol xs="12">
          <CCard>
            <CCardHeader>
              <h4 className="m-0"style={{ textAlign: "center",  fontWeight:"bolder"}}>Employee List</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  {employeeList.length > 0 && (
                    <>
                      <p
                        className="mb-0 mr-2 font-weight-bold"
                        style={{ textAlign: "right" }}
                      >
                        Total: {employeeList.length} row(s)
                      </p>
                      <div className="overflow">
                        <table className="table table-info table-sm">
                          <thead>
                            <tr>
                              <th className="text-center" width={50}>
                                No
                              </th>
                              <th className="text-center" width={50}>
                                ID
                              </th>
                              <th className="text-center" width={180}>
                                UserName
                              </th>
                              <th className="text-center" width={250}>
                                Email
                              </th>
                              <th className="text-center" width={200}>
                                Date Of Birth
                              </th>
                              <th className="text-center" width={150}>
                                Gender
                              </th>
                              <th className="text-center" width={230}>
                                English Skill
                              </th>
                              <th className="text-center" width={150}>
                                Japanese Skill
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeList.map((data, index) => {
                              return (
                                <tr key={index}>
                                  <td width={50} className="text-center">
                                    {index + 1}
                                  </td>
                                  <td className="text-center">{data.id}</td>
                                  <td className="text-center">{data.name}</td>
                                  <td className="text-center"> {data.email}</td>
                                  <td className="text-center">
                                    {data.date_of_birth}
                                  </td>
                                  <td className="text-center">{data.gender}</td>
                                  <td className="text-center">
                                    {data.english_skill}
                                  </td>
                                  <td className="text-center">
                                    {data.japanese_skill}
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
      <WidgetsBrand withCharts/>


    </>
  );
};

export default Dashboard;
