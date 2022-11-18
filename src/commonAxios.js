import axios from 'axios'; // 액시오스

/* 
 * 설명 : commonAxios.js
 * ------------------------------------------------------------- 
 * 작업일         작업자    작업내용
 * ------------------------------------------------------------- 
 * 2022.10.11    김요한    최초작성 - 백엔드와 연결
 * 2022.10.19    김요한    axios 연결 공통화 및 params 추가
 * 2022.11.14    김요한    axios 멀티파트 추가
 * -------------------------------------------------------------
*/

export async function commonAxios(url, params , callback) {

  await axios(
    {
      url: url,
      method: 'post',
      baseURL: 'http://localhost:9999',
      data: params,
      withCredentials: true,
    }
  ).then(function (response) {
    callback(response.data);
  })
  .catch((err) => {
    callback(err.response.data.errors);
  });
}

export  async function commonMultiPart(url, params , callback) {

  await axios(
      {
        url: url,
        method: 'post',
        baseURL: 'http://localhost:9999',
        data: params,
        withCredentials: true,
        headers: {
          'content-type': 'multipart/form-data'
      }
      }
    ).
    then(function (response) {
      callback(response.data);
    })
    .catch((err) => {
      callback(err.response.data.errors);
    })
}
