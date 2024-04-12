import { CButton, CCard, CCardBody, CCol, CImg, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLabel, CRow } from '@coreui/react';
import React from 'react'
import SuccessError from '../common/SuccessError';

const LoginForm = (props) => {
    let {zoomSize,keyDownHandler,loginClick,passwordChange,password,userCodeChange,userCode,success,error} = props;
  return (
    <>
    {zoomSize < 150 && (
    <div
      className="min-vh-100  flex-row align-items-center login-bg"
    >
    <CRow>
  <CCol lg="3"></CCol>
<CCol lg="6">
<CCard className="login" style={{marginTop:"100px",height:"420px",width:"600px"}}
               >
                <CCardBody>

                  <CRow alignHorizontal='center'>
                  <CImg src='./image/delete.png' width={130} height={110} style={{ borderRadius: '10px' }}></CImg>

                  </CRow>
                  <CRow alignHorizontal='center' className="mb-3">
                    <h3 className='login-title'>Registration System</h3>
                  </CRow>
                  <SuccessError success={success} error={error} />
                  <CRow className="mt-4 align-items-center">
                    <CCol lg="4"><CLabel className="form-label">User Code</CLabel></CCol>
                    <CCol lg="8">
                      <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/user.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter User Code' type='text'
                        autoFocus value={userCode} onChange={userCodeChange} onKeyDown={keyDownHandler}
                        ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
              <br></br>
              <br></br>
                  <CRow className="align-items-center">
                    <CCol lg="4"><CLabel className="form-label mt-0">Password</CLabel></CCol>
                    <CCol lg="8">
                    <CInputGroup>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CImg src='./image/password.png' width={20} height={20}></CImg>
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput className="login-input" placeholder='Enter Password' type='password'
                         value={password} onChange={passwordChange} onKeyDown={keyDownHandler}
                         ></CInput>
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <br></br>
                  <br></br>
                  <CRow alignHorizontal='center' className="mb-4">
                    <CButton id="login" className='form-btn login-btn'
                     onClick={loginClick}
                    >Login</CButton>
                  </CRow>


                </CCardBody>
              </CCard>

</CCol>

  <CCol lg="3"></CCol>

    </CRow>
    </div>
    )}
    {zoomSize > 149 && (
        <div className="login-bg-mobile">
          <br></br>
          <br></br>
          <h2
            style={{ textAlign: "center", fontWeight: "800", color: "black" }}
          >
            Registration System
          </h2>
          <CRow style={{ justifyContent: "center" }}>
            <CImg src={"/image/password.png"} width={200}></CImg>
          </CRow>
          <CRow style={{ paddingLeft: "100px", paddingRight: "100px" }}>
            <CCol lg="3"></CCol>
            <CCol lg="6">
            <SuccessError success={success} error={error} />
              <label
                style={{
                  fontWeight: "800",
                  color: "black",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                UserCode
              </label>
              <br></br>
              <CInput type="text" className="input-field-blue-background"
                   value={userCode} onChange={userCodeChange} onKeyDown={keyDownHandler}
              />
              <br></br>
              <label
                style={{
                  fontWeight: "800",
                  color: "#0b3570",
                  fontSize: "15px",
                  marginTop: "20px",
                }}
              >
                Password
              </label>
              <br></br>
              <CInput type="password" className="input-field-blue-background"
               value={password} onChange={passwordChange} onKeyDown={keyDownHandler}
              />
              <br></br>
            </CCol>
            <CCol lg="3"></CCol>
          </CRow>
          <br></br>
          <CRow
            style={{
              paddingLeft: "100px",
              paddingRight: "100px",
              justifyContent: "center",
            }}
          >
            <CButton className="btn create-btn"
             onClick={loginClick}
             style={{ padding: '3px',margin:'3px' ,borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', backgroundColor: 'black', color: '#fff' }}
            >
              <p style={{ marginTop: "3px" }}> Login</p>
            </CButton>
          </CRow>
          <CRow style={{ height: "100px" }}>&nbsp;</CRow>
        </div>
          )}
    </>

  )
};

export default LoginForm
