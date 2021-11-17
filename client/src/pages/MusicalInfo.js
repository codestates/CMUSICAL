import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Tab from '../components/Tab';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';
import getAuth from '../functions/getAuth';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

export const Container = styled.div``;

export default function MusicalInfo({ isLogin, loginHandler, logoutHandler }) {
  const navigate = useNavigate();
  //! isLogin 받아서 상태 처리 해줘야함
  const { id } = useParams('id'); //! id: musicalId => id를 musicalId로 바꾸는 js 문법
  const [item, setItem] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [list, setList] = useState([]);

  const handleFilter = async (text) => {
    let totalList, favoritesList;
    navigate('/');
    if (text) {
      totalList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}?title=${text}`);
    } else {
      totalList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}`);
    }
    await getAuth(loginHandler, logoutHandler);
    await axios
      .get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`)
      .then((data) => {
        favoritesList = data;
        setFavorites(favoritesList.data.items);
      })
      .catch((err) => {});
    setList(totalList.data.items);
  };

  useEffect(() => {
    async function getMusicalInfoFromAsync() {
      getAuth(loginHandler, logoutHandler);
      const info = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/getitem`, { params: { id } });
      setItem(info.data.item);
      if (getAuth(loginHandler, logoutHandler)) {
        const favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
        setFavorites(favoritesList.data.items);
      }
    }
    getMusicalInfoFromAsync();
  }, []);

  return (
    <>
      <Navigation handleFilter={handleFilter} isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      <div>
        {item ? (
          <div>
            <div>
              <Thumbnail isLogin={isLogin} thumbnail={item.thumbnail} title={item.title} id={item.id} favorites={favorites} setFavorites={setFavorites} />
            </div>
            <div>
              <span>제목: {item.title}</span>
              <span>장소: {item.theater}</span>
              <span>출연자: {item.cast}</span>
              <span>가격: {item.price}</span>
              <span>런타임: {item.runtime}</span>
              <span>공연 시간: {item.showtime}</span>
              <span>공연 시작 날짜: {item.dateFrom}</span>
              <span>공연 종료 날짜: {item.dateTo}</span>
              <span>공연 상태: {item.state}</span>
            </div>
          </div>
        ) : (
          '로딩 이미지'
        )}
        <div>
          {/* TODO: item의 상세 이미지 Tab 컴포넌트에 같이 넘겨주기 */}
          {Object.keys(item).length === 0 ? <div /> : <Tab id={id} poster={item.poster} isLogin={isLogin} />}
        </div>
      </div>
      <Footer />
    </>
  );
}
