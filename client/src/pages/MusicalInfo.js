import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Thumbnail from '../components/Thumbnail';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';

export const Container = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid;
`;

export default function MusicalInfo({ isLogin, loginHandler, logoutHandler }) {
  const { id: musicalId } = useParams('id');
  // const [getDetails, setGetDetails] = useState();
  // const [isExist, setIsExist] = useState(false);
  console.log(musicalId);

  // useEffect(() => {
  //   axios.get('https://localhost:4000/dummy/getitem').then((data) => {
  //     const info = data.data.dbs.db;
  //     if (musicalId === info.mt20id) {
  //       setGetDetails(info);
  //       setIsExist(true);
  //       // console.log(getDetails);
  //     }
  //   });
  // }, []);

  return (
    <div id="container">
      <div id="header">
        <Navigation isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      </div>
      <div id="body">
        <Thumbnail />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
/*export default function MusicalInfo() {
  const { musicalId } = useParams('id');
  const [getDetails, setGetDetails] = useState({
    dtguidance: '',
    entrpsnm: '',
    fcltynm: '',
    genrenm: '',
    mt10id: '',
    mt20id: '',
    openrun: '',
    pcseguidance: '',
    poster: '',
    prfage: '',
    prfcast: '',
    prfcrew: '',
    prfnm: '',
    prfpdfrom: '',
    prfpdto: '',
    prfruntime: '',
    prfstate: '',
    sty: '',
    styurls: { styurl: [] },
  });
  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:4000/dummy/getitem').then((data) => {
      let info = data.data.dbs.db;
      // console.log(info);
      if (info.mt20id !== 'PF182867') {
        setIsSame(false);
      } else {
        setIsSame(true);
        setGetDetails(info);
      }
    });
  }, []);
  // Thumbnail.js 썸네일 불러오기
  // MusicalDetils.js 디테일 정보 불러오기
  // Tab.js 탭 불러오기
  // 기본적으로 Posters.js 보여주기
  // Tab.js에서 comment 누르면 Comments.js 보여주기
  return;
}*/
