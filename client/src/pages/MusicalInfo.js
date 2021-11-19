import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Tab from '../components/Tab';
import Footer from '../components/Footer';
import { Container } from '../components/styles/Container.styled';
import { Body } from '../components/styles/Body.styled';
import styled from 'styled-components';
import axios from 'axios';
import getAuth from '../functions/getAuth';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 0 0 0;
  margin-bottom: 4rem;

  .title {
    border-bottom: 3px solid #574240;
    margin-bottom: 2rem;
    padding-bottom: 0.5rem;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: center;

  .info {
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 400px;
    justify-content: center;
    margin: 1rem 0 0 3rem;
    padding: 0 0 0 2rem;
    border: 2px solid #574240;
    border-radius: 20px;
  }
`;

export const Row = styled.div`
  margin: 0.7rem 0;
`;

export const Span = styled.span`
  display: ${({ infoT }) => (infoT ? 'inline-block' : '')};
  font-size: ${({ title, info, infoT }) => (title ? '2.4rem' : info ? (infoT ? '1.5rem' : '1.3rem') : '1rem')};
  padding: ${({ title, infoT }) => (title ? '0 1rem 0 0' : infoT ? '0' : '0 0 0 1rem')};
  width: ${({ infoT }) => (infoT ? '100px' : '0')};
  border-right: ${({ infoT }) => (infoT ? '2px solid #574240 ' : '')};
  color: #1c1c1c;
`;

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
      <Container>
        <Body>
          {item ? (
            <Top>
              <div className="title">
                <Span title>{item.title}</Span>
                <Span>{item.state}</Span>
              </div>
              <Info>
                <div className="thumb">
                  <Thumbnail isLogin={isLogin} thumbnail={item.thumbnail} title={item.title} id={item.id} favorites={favorites} setFavorites={setFavorites} />
                </div>
                <div className="info">
                  <Row>
                    <Span info infoT>
                      기간
                    </Span>
                    <Span info>{item.dateFrom} ~</Span>
                    <Span info> {item.dateTo}</Span>
                  </Row>
                  <Row>
                    <Span info infoT>
                      장소
                    </Span>
                    <Span info>{item.theater}</Span>
                  </Row>
                  <Row>
                    <Span info infoT>
                      시간
                    </Span>
                    <Span info>{item.showtime}</Span>
                  </Row>
                  <Row>
                    <Span info infoT>
                      가격
                    </Span>
                    <Span info>{item.price}</Span>
                  </Row>
                  <Row>
                    <Span info infoT>
                      출연자
                    </Span>
                    <Span info>{item.cast}</Span>
                  </Row>
                  <Row>
                    <Span info infoT>
                      런타임
                    </Span>
                    <Span info>{item.runtime}</Span>
                  </Row>
                </div>
              </Info>
            </Top>
          ) : (
            <div>Lodding...</div>
          )}
          <div className="bottom">{Object.keys(item).length === 0 ? <div /> : <Tab id={id} poster={item.poster} isLogin={isLogin} />}</div>
        </Body>
        <Footer />
      </Container>
    </>
  );
}
