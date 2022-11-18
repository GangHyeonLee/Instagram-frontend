import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiMoreHorizontal, FiSend } from "react-icons/fi";
import { BsArrowLeft, BsFillCloudDownloadFill } from "react-icons/bs";
import {
  IoMdHeartEmpty,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosClose,
} from "react-icons/io";
import { BsChat, BsEmojiSmile, BsBookmark } from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import * as commonAxios  from "../../../commonAxios";
import "./PostUploadPage.css";

/*
 * 설명 : PostDetailPage.js
 * -------------------------------------------------------------
 * 작업일         작업자    작업내용
 * -------------------------------------------------------------
 * 2022.10.13    김영일    최초작성
 * 2022.10.26    김영일    ui fixed
 *
 * 2022.11.04    이강현    백엔드연결, 데이터바인딩 완료
 * 2022.11.05    이강현    게시글번호에 따른 상세페이지 호출 완료
 * -------------------------------------------------------------
 */

export default function PostUploadPage() {
  const [loading, setLoading] = useState(false);
  const [postList, resultData] = useState([]);

  const location = useLocation();

  //PostList.js 에서 보내준 파라미터 postId 취득
  //   const postId = location.state.postId;

  useEffect(() => {
    console.log(postList);
    //    axios.post(`http://localhost:9999/post/postDetail?postId=7`).then(({data}) =>{
    //     console.log(data);
    //    })

    // const inputs = {postId};

    // commonAxios.commonAxios(`/post/postDetail`, inputs, callback);

    // function callback(data) {
    //   resultData(data);
    //   setLoading(false);
    // }

    return () => {};
  }, []);

  //   if (loading)
  //   return(
  //    <div className="box" style={{margin: "30px 0"}} >
  //       {" "}
  //       Loading...
  //     </div>
  //   );

  //   if (postList.length === 0) {
  //   } else {

  {
    /* 사진 업로드 페이지 */
  }
  function noneUpload() {
    return (
      <>
        <div className="post-upload-box-inner">
          <div
            className="post-upload-box-title"
            style={{ justifyContent: "center" }}
          >
            <div style={{ "font-size": "1.8em" }}>새 게시물 만들기</div>
          </div>
          <div
            className="post-upload-box-inner-inner"
            style={{ display: "block", padding: "15%" }}
          >
            {/* 사진 넣어지는 부분 */}
            <div style={{ width: "100%", textAlign: "center" }}>
              <BsFillCloudDownloadFill style={{ fontSize: "8rem" }} />
            </div>
            <div
              style={{ textAlign: "center", fontSize: "2rem", margin: "15px" }}
            >
              사진과 동영상을 여기에 끌어다 놓으세요
            </div>
            <div style={{ textAlign: "center" }}>
              <label
                for="upload"
                style={{
                  cursor: "pointer",
                  padding: "8px 6px",
                  background: "rgb(0,169,246)",
                  color: "white",
                  "border-radius": "10px",
                  "font-size": "1.5rem",
                }}
              >
                컴퓨터에서 선택
              </label>
              <input id="upload" style={{ display: "none" }} type="file" />
            </div>
          </div>
          <div class="upload-close">
            <IoIosClose />
          </div>
        </div>
        ;
      </>
    );
  }

  {
    /* 사진 업데이트 직전 페이지! */
  }
  function uploadedPage() {
    return (
      <>
        <div className="post-upload-box-inner">
          <div className="post-upload-box-title">
            <div style={{ width: "3vw" }}>
              <BsArrowLeft style={{ "font-size": "20pt", display: "flex" }} />
            </div>
            <div style={{ "font-size": "1.8em" }}>새 게시물 만들기</div>
            <div
              style={{
                "font-size": "1.5em",
                color: "rgb(0 149 246)",
                cursor: "pointer",
              }}
            >
              공유하기
            </div>
          </div>
          <div className="post-upload-box-inner-inner">
            {/* 사진 넣어지는 부분 */}
            <div className="img-post-upload">
              <img
                className="img-header-post"
                src={
                  "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                }
                //   src={`${postList.fileInfo[0].uuidFileNm}`}
                alt="post"
              />
            </div>
            {/* 글쓰는 부분 */}
            <div className="post-upload-footer-post">
              <div className="post-upload-username">
                <div className="infos-post">
                  <img
                    className="img-header-post"
                    src={
                      "https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces"
                    }
                    // src={`${postList.fileInfo[0].uuidFileNm}`}
                    alt="post"
                  />
                  {/* <p>{postList.postInfo.userId}</p> */}
                </div>
              </div>
              <textarea
                rows="10"
                cols="40"
                placeholder="문구입력.."
                style={{
                  border: "0",
                  resize: "none",
                  margin: "0 10px 10px 10px",
                  "font-size": "1.7rem",
                }}
              ></textarea>
              <IconContext.Provider value={{ size: "30px" }}>
                <div className="post-upload-engagement-post">
                  <div className="icons-1">
                    <div className="icon">
                      <IoMdHeartEmpty />
                    </div>
                    <div className="icon">
                      <BsChat />
                    </div>
                    <div className="icon">
                      <FiSend />
                    </div>
                  </div>
                  <div className="icon">
                    <BsBookmark />
                  </div>
                </div>
              </IconContext.Provider>
              <div className="post-upload-legend">
                <p>
                  {/* <span>{postList.postInfo.userId}</span>  */}
                  {/* {postList.postInfo.postContent}  */}
                </p>
              </div>
              <div className="post-upload-time-post">
                {/* <time>{postList.postInfo.createDt}</time> */}
              </div>
              <div className="post-upload-comment">
                <div className="post-upload-fake-comment">
                  <IconContext.Provider value={{ size: "25px" }}>
                    <div className="icon">
                      <BsEmojiSmile />
                    </div>
                  </IconContext.Provider>
                  <input placeholder="댓글달기..." />
                </div>
                <button>게시</button>
              </div>
            </div>
          </div>

          <div class="upload-close">
            <IoIosClose />
          </div>
        </div>
        ;
      </>
    );
  }
  return (
    <>
      <div className="post-upload-box">
        {postList == false ? noneUpload() : uploadedPage()}
      </div>
    </>
  );
}
// }
