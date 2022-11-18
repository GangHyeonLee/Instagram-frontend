import { Component, useState } from "react";

import Header from "../Header/Header";

import pp1 from "../../images/pp1.png";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IoMdSettings} from 'react-icons/io'
import {FaHeart } from 'react-icons/fa'
import {FaComment } from 'react-icons/fa'

import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import React, { useEffect } from 'react';

import * as commonAxios from '../../commonAxios';

import "./PersonalPage.css";

/* 
 * 설명 : PersonalPage.js
 * ------------------------------------------------------------- 
 * 작업일         작업자    작업내용
 * ------------------------------------------------------------- 
 * 2022.10.13    김영일    최초작성 
 * 2022.10.26    김요한    쿠키추가
 * 2022.10.27    김요한    개인 페이지 프로필 부분 완료 (추후 게시글 이미지 영역 진행 예정)
 * -------------------------------------------------------------
*/

function PersonalPage() {
	
  /**
     * 2022.10.28.김요한.추가 - 프론트 , 백엔드 데이터 송/수신 내용
     * 
     * 프론트엔드 request 데이터 형태
     * -> 백엔드에서 Session을 체크하므로 데이터 보낼 필요 없음
     * 
     * 백엔드 response 데이터 형태
     * 성공 사례
     * -> totalList : {
     *       "resultCd"   : "SUCC",
     *       "resultMsg"  : "~~~~~~~~",
     *       "followCnt"  : {.... , .... },
     *       "postCnt"  : {.... , .... },
     *       "userProfile"  : {.... , .... },
     *       "postList"   : {.... , .... } ,
     *       "fileList" : {.... , .... } ,
     *    }
     * 
     * 실패 사례
     * -> totalList : {
     *       "resultCd"   : "FAIL",
     *       "resultMsg"  : "~~~~~~~~",
     *    }
     * 
     */

  // 2022.10.26.김요한 - 쿠키 추가
  const [cookies, setCookie , removeCookie] = useCookies(['loginId']); // 쿠키 훅 
  const navigate = useNavigate();

  const userId = cookies.loginId; // 쿠키에서 id 를 꺼내기
  const userNick = cookies.loginNick; // 쿠키에서 id 를 꺼내기
  
  const [loading, setLoading] = useState(true);
  const [totalList, resultData] = useState([]);

  useEffect(() => {

      if (userId === undefined) {
          alert('세션이 만료되었습니다.')
          navigate('/login')
      } else {
        commonAxios.commonAxios('/user/personalPage' , {} , callback);
        function callback(data) {
          resultData(data);
          setLoading(false);
        }
      }
      return () => {
      };
  }, []); 
  
  if (loading) {
    return <div className="box" style={{margin: "30px 0"}} > Loading... </div>;
  } else {;}

  return (
    <>
    <Header   />
    <div className="personalPage-container">
      <div className="profile">
        <div className="profile-image">
          <img src={cookies.userImg.uuidFileNm} style={{ height: '180px' , width : '180px'}} alt="" />
        </div>
        <div className="profile-user-settings">
          <h1 className="profile-user-name">{userNick}</h1>
          <button className="btn profile-edit-btn">프로필 편집</button>
          <button className="btn profile-settings-btn" aria-label="profile settings"><IoMdSettings className="setting-btn" aria-hidden="true" /></button>
        </div>
        <div className="profile-stats">
          <ul>
            <li><span className="profile-stat-count">{totalList.postCnt}</span> 게시물</li>
            <li><span className="profile-stat-count">{totalList.followerCnt}</span> 팔로워</li>
            <li><span className="profile-stat-count">{totalList.followingCnt}</span> 팔로잉</li>
          </ul>
        </div>
        <div className="profile-bio">
          <p><span className="profile-real-name">{userNick}</span> {totalList.userProfile} </p>
        </div>
      </div>
      {/* <!-- End of profile section --> */}
    </div>
    {/* <!-- End of container --> */}
    <div className="personalPage-container">
      <div className="gallery">
      {totalList.postList.map((post, index) => (
                    <div className="gallery-item" tabIndex="0">
                        <img src={totalList.fileList[index].uuidFileNm} className="gallery-image" alt="" />
                        <div className="gallery-item-info">
                            <ul>
                                <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><FaHeart className="io-text" aria-hidden="true"/> 56</li>
                                <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><FaComment className="io-text fa-comment" aria-hidden="true" /> 2</li>
                            </ul>
                        </div>
                    </div>
                ))}        
      </div>
      {/* <!-- End of gallery --> */}
      {/* 사진을 불러오는 동안 로더 나오게 함  */}
      {/* <div className="loader"></div> */}

    </div>
{/* <!-- End of post container --> */}

        {/* <div className="user-Details-Container">
          <div className="user-Details-content">
            <div className="profile-container">
              <img
                className="profile-img"
                src={pp1}
                alt="my profile"
              />

              <div className="user-post-detail-container">
                <h1 className="profile-name">Youngil Kim</h1>
                <ul className="user-follower-container">
                  <li>
                    <p className="post-count ">
                      <span className="count ">5 </span>
                      posts
                    </p>
                  </li>
                  <li>
                    <p className="post-count">
                      <span className="count">32</span>
                      followers
                    </p>
                  </li>
                  <li>
                    <p className="post-count">
                      {" "}
                      <span className="count ${textColor">
                        32{" "}
                      </span>
                      following
                    </p>
                  </li>
                </ul>
                <p className="post-count count">afaf</p>
                <p className="post-count">biobio</p>
              </div>
            </div>
            <div className="users-all-post">
              <ul className="user-story-container">
              {/* 올렸던 스토리들이 모아지는 곳입니다 */}
                {/* {storyDetails.map((eachStory) => (
                  <li key={eachStory.id} className="story-item">
                    <img
                      className="user-story"
                      src={eachStory.image}
                      alt="my story"
                    />
                  </li>
                ))} */}
              {/* </ul>
            </div>
            <div className="user-all-post-container">
              <div className="users-all-post">
           
                <h1 className="post-count">Posts</h1>
              </div> */}
              {/* 포스트 했던 사진들이 보이는 곳입니다 */}
              {/* {postDetails.length > 0 ? (
                <ul className="all-post-container">
                  {postDetails.map((eachPost) => (
                    <li className="all-post-img" key={eachPost.id}>
                      <img
                        className="posted-img"
                        src={eachPost.image}
                        alt="my post"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-post-container">
                  <BiCamera className="No-post-available" />
                  <h1 className="post-count">No Posts Yet</h1>
                </div>
              )} */}
            {/* </div>
              
          </div>
        </div> */}
     
    </>
  );
}

export default PersonalPage;
