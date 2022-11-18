import Header from "../../Header/Header";
import './FollowSuggPage.css'
 
/** 
 * navigate , cookies , useState , useEffect , commonAxios 사용 위한 import
 */
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import React, { useState , useEffect } from 'react';
import * as commonAxios from '../../../commonAxios';
/* 
 * 설명 : FollowPage.js
 * ------------------------------------------------------------- 
 * 작업일         작업자    작업내용
 * ------------------------------------------------------------- 
 * 2022.11.05    김요한    최초작성 
 * -------------------------------------------------------------
 */

function FollowSuggPage() {

    const [cookies, setCookie , removeCookie] = useCookies(['loginCookie']); // 쿠키 훅 

    const userId = cookies.loginId; // 쿠키에서 id 를 꺼내기

    const [loading, setLoading] = useState(true);
    const [totalList, resultData] = useState([]);

    const navigate = useNavigate();

    /**
     * 2022.10.28.김요한.추가 - 프론트 , 백엔드 데이터 송/수신 내용
     * 
     * 프론트엔드 request 데이터 형태
     * -> 데이터 가져오는 곳이므로 현재는 없음
     * 
     * 백엔드 response 데이터 형태
     * -> totalList : {
     *       "followingList" : {.... , .... } 
     *    }
     */

     useEffect(() => {

        if (userId === undefined) {
            alert('세션이 만료되었습니다.')
            navigate('/login')
        } else {
            commonAxios.commonAxios('/follow/followSuggList' , {} , callback);

            function callback(data) {
                resultData(data);
                setLoading(false);
            }
        }
        return () => {
        };
    },
    []); 

    const doFollow = (followId) => {
        const postData = {
            userId : followId
        }

        commonAxios.commonAxios('/follow/doFollow' , postData , callback);

        function callback(data) {
            if (data.resultCd === "SUCC") {
                window.location.reload();
            } else {;}
        }
       
    };

    /* 페이지 호출 시 백엔드 호출 전 로딩 상태 표시 (계속 이상태면 백엔드 서버 꺼져있을 가능성 o) */
    if (loading) {
        return <div className="box" style={{margin: "30px 0"}} > Loading... </div>;
    } else {;}
    
    /* 로그인으로 접근이 아닌 url 직접 접근을 막기 위한 형태*/
    if (userId === undefined) {
    } else {
        return (
            <>
            <Header />
                <div className="followGrid" >
                    {/* 팔로우 리스트 영역 */}
                    <div className="second-column" style={{gridArea: "secondColumn"}}>
                        <div className="container-suggestion">
                            <div className="header-suggestion" >
                                <img src={cookies.userImg.uuidFileNm} alt="profile"/>
                                <div className="user-infos-suggestion" >
                                    <div className="infos" >
                                        <span>{cookies.loginId}</span>
                                        <p>{cookies.loginNick}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="header-main-suggestion" >
                                <p>회원님을 위한 추천</p>
                            </div>
                            <div className="user-suggestion" >
                            {totalList.followSuggList.map((followInfo, key) => (
                                    <div className="infos-suggestion" key={key}>
                                    <img className="image-user-story" src={totalList.followSuggImgList[key].uuidFileNm} alt="profile" />
                                    <div className="info-suggestion" >
                                        <span>{followInfo.userId}</span>
                                        <p>{followInfo.userNick}</p>
                                    </div>
                                    <button className='follow' style={{margin: "0 -50px 0 0"}} onClick={()=>{doFollow(followInfo.userId);} }>팔로우</button>
                                </div>
                            ))}
                            </div>
                            {/* 팔로우 리스트 아래 푸터 영역 */}
                            <footer className="footer-suggestion" >
                                <p>깃허브 주소 &bull; 개발자 소개 ......</p>
                                <p>&copy; 2022 INSTAGRAM FROM META</p>
                            </footer>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default FollowSuggPage;