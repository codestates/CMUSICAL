import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Tab from '../components/Tab';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

export const Container = styled.div`
  width: auto;
  min-height: auto;

  > #body {
    border: 3px solid blue;
    padding: 70px;

    > .top {
      display: flex;
      min-height: 500px;
      justify-content: space-evenly;
      align-items: center;
      border: 3px solid;
      padding: 20px 0px;

      .details {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      span {
        margin: 4px 0px;
      }
    }
  }
`;

export default function MusicalInfo({ isLogin, loginHandler, logoutHandler }) {
  const { id } = useParams('id'); //! id: musicalId => id를 musicalId로 바꾸는 js 문법
  const [item, setItem] = useState({});
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function getMusicalInfoFromAsync() {
      const info = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/getitem`, { params: { id } });
      const favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
      setItem(info.data.item);
      setFavorites(favoritesList.data.items);
    }
    getMusicalInfoFromAsync();
  }, []);

  return (
    <Container>
      <Navigation isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      <div id="body">
        {item ? (
          <div className="top">
            <div className="thumbnail">
              <Thumbnail thumbnail={item.thumbnail} title={item.title} id={item.id} favorites={favorites} />
            </div>
            <div className="details">
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
        <div className="bottom">
          {/* TODO: item의 상세 이미지 Tab 컴포넌트에 같이 넘겨주기 */}
          {Object.keys(item).length === 0 ? <div /> : <Tab id={id} poster={item.poster} />}
        </div>
      </div>
      <Footer />
    </Container>
  );
}
