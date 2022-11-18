import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as commonAxios from "../../commonAxios";
import * as commonUtils from "../../commonUtils";

import insta_logo from "../../images/insta_logo.png";
import "./SignupPage.css";

import Modal from "../Common/Modal";

/*
 * 설명 : suggestion.js
 * -------------------------------------------------------------
 * 작업일         작업자    작업내용
 * -------------------------------------------------------------
 * 2022.10.13    김영일    최초작성
 * 2022.10.19    김요한    회원가입 취소 버튼 추가 (취소 시 login 페이지로 변경)
 * 2022.10.20    김영일    input 사항들 추가
 * 2022.10.24    김요한    회원가입 양식 유효성 검증 및 데이터 처리 진행완료
 * 2022.11.01    김요한    모달 팝업 추가
 * 2022.11.07    김영일    사진등록 추가
 * 2022.11.14    김요한    이미지 업로드 추가
 * -------------------------------------------------------------
 */

function SignupPage(props) {
  const navigate = useNavigate();
  const pageMove = (url) => {
    navigate(url);
  };
  const fileInput = useRef(null);

  const fixedImage =
    "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces";
  const [userImage, setUserImage] = useState(fixedImage);
  const [dataImg, setDataImage] = useState();
  const [userId, setUserId] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userName, setUserName] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const [userPwdChk, setUserPwdChk] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const userProfileData = {
    userImage,
    userId,
    userName,
    userNick,
    userPwd,
    userPwdChk,
    userEmail,
    userPhone,
  }
  const onUserImageChange = (e) => {
    if (e.target.files[0]) {
      // 2022.11.12.김요한.추가 - userImage 는 화면에 바뀌는 데이터 형식(String) , dataImg는 실질적인 데이터 전송 형식 (File) // 합칠 수 있으면 합치길 원함!
      setUserImage(()=>e.target.files[0]);
      setDataImage(()=>e.target.files[0]);
    } else {
      //업로드 취소할 시
      setUserImage("https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces");
    }
    //FileReader 를 통해 비동기로 읽을 수 있음.
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserImage(reader.result);
      } else{;}
    };
    reader.readAsDataURL(e.target.files[0]);
};
  

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 해당 데이터를 모달창에서 뿌리기 위함
  const [resultData, setResultData] = useState([]);

  // 모달창을 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = commonUtils.isEqualCheck(userPwd, userPwdChk);

    if (result === true) {

      // 2022.11.12.김요한.추가 - FormData 선언 및 inputData => 이 부분은 헤더를 application/json 로 데이터 변경
      const formData = new FormData()
      const inputs = new Blob([JSON.stringify(userProfileData)], {type: "application/json"}) 
      formData.append('fileInfo',dataImg);
      formData.append('userInfo',inputs);

      await commonAxios.commonMultiPart('/user/userRegister' , formData , callback);
      
      function callback(data) {
        if (data[0].resultCd === "SUCC") {
          navigate("/login");
          console.log(data)
        } else {
        }
        setResultData(data);
      }
    } else {
      const data = [
        {
          resultMsg: "유저 비밀번호와 유저 비밀번호 확인 부분이 맞지 않습니다.",
        },
      ];
      setResultData(data);
    }
    setModalOpen(true);
  };

  return (
    <>
      <Modal open={modalOpen} close={closeModal} header="회원 가입">
        <main> {props.children} </main>
        {resultData.map((result) => (
          <span>
            {result.resultMsg}
            <br />
          </span>
        ))}
      </Modal>
      <div className="signup--form-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <img className="signup-website-logo-desktop-img" src={insta_logo} />
          <div className="input-container">
            <div className="signup-profile">
              <div className="signup-profile-image">
                <img
                  src={userImage}
                  alt="userImage"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                />
              </div>
              <div className="signup-profile-user-settings">
                {/* input을 숨기고 label을 통해 깔끔하게 보이도록 만듦.  */}
                <label
                  className="btn signup-profile-edit-btn"
                  htmlFor="userImage"
                >
                  {userImage == fixedImage ? `사진등록` : `취소`}
                </label>
                <input
                  style={{ display: "none" }}
                  className="btn signup-profile-edit-btn"
                  id="userImage"
                  type="file"
                  accept="image/*"
                  name="user_img"
                  onChange={onUserImageChange}
                  ref={fileInput}
                />
              </div>
            </div>
            <label className="input-label" htmlFor="userid">
              유저 아이디
            </label>
            <input
              type="text"
              id="userId"
              className="userid-input-field"
              onChange={(e)=>setUserId(e.target.value)}
              value={userId}
              placeholder="아이디를 입력해주세요."
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              유저 이름
            </label>
            <input
              type="text"
              id="userName"
              className="username-input-field"
              onChange={(e) =>setUserName(e.target.value)}
              value={userName}
              placeholder="이름을 입력해주세요."
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="usernickname">
              유저 닉네임
            </label>
            <input
              type="text"
              id="userNick"
              className="usernickname-input-field"
              onChange={(e)=>setUserNick(e.target.value)}
              value={userNick}
              placeholder="닉네임을 입력해주세요."
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              유저 비밀번호
            </label>
            <input
              type="password"
              id="userPwd"
              className="password-input-field"
              onChange={(e)=>setUserPwd(e.target.value)}
              value={userPwd}
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password-check">
              유저 비밀번호 확인
            </label>
            <input
              type="password"
              id="userPwdChk"
              className="password-input-field"
              onChange={(e) =>setUserPwdChk(e.target.value)}
              value={userPwdChk}
              placeholder="비밀번호를 입력해주세요."
            />
            <div className="input-container">
              <label className="input-label" htmlFor="email">
                유저 이메일
              </label>
              <input
                type="email"
                id="userEmail"
                className="email-input-field"
                onChange={(e)=>setUserEmail(e.target.value)}
                value={userEmail}
                placeholder="이메일을 입력해주세요."
              />
            </div>
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="phone">
              유저 핸드폰
            </label>
            <input
              type="text"
              id="userPhone"
              className="phone-input-field"
              onChange={(e)=>setUserPhone(e.target.value)}
              value={userPhone}
              placeholder="핸드폰 번호를 입력해주세요."
            />
          </div>

          <button className="register-button" type="submit">
            등록
          </button>

          <button
            className="register-button"
            type="button"
            onClick={() => pageMove("/login")}
          >
            취소
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
