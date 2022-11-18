// 기존 테스트용 
//import React from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Header from './test/Header';
//import Main from './test/Main';
//import Product from './test/Product';
//import NotFound from './test/NotFound';
//
//const App = () => {
//    return (
//        <div className='App'>
//            <BrowserRouter>
//                <Header />
//                <Routes>
//                    <Route path="/" element={<Main />}></Route>
//                    <Route path="/product/*" element={<Product />}></Route>
//                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
//                    <Route path="*" element={<NotFound />}></Route>
//                </Routes>
//            </BrowserRouter>
//        </div>
//    );
//};
//
//export default App;