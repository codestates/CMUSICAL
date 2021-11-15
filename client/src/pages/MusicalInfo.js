import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Tab from '../components/Tab';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const Container = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid;

  > #body {
    border: 3px solid blue;
    padding: 50px;

    > .top {
      display: flex;
      border: 3px solid red;
      padding: 0 50px;

      > .thumbnail {
        border: 3px solid;
      }

      > .details {
        border: 3px solid;
      }
    }

    > .bottom {
      border: 3px solid green;
    }
  }
`;

export default function MusicalInfo() {
  const { id } = useParams('id'); //! id: musicalId => id를 musicalId로 바꾸는 js 문법
  const [item, setItem] = useState({});

  useEffect(() => {
    axios.get(`process.env.REACT_APP_SERVER_ADDR/getitem`, { params: { id } }).then((data) => {
      const info = data.data.item;
      setItem(info);
    });
  }, []);

  return (
    <Container>
      <Navigation />
      <div id="body">
        {item ? (
          <div className="top">
            <div className="thumbnail">
              <Thumbnail thumbnail={item.thumbnail} title={item.title} id={item.id} />
            </div>
            <div className="details">
              <span>{item.title}</span>
              <span>{item.theater}</span>
              <span>{item.pcseguidance}</span>
              <span>{item.cast}</span>
              <span>{item.price}</span>
              <span>{item.runtime}</span>
              <span>{item.showtime}</span>
              <span>{item.dateFrom}</span>
              <span>{item.dateTo}</span>
              <span>{item.state}</span>
            </div>
          </div>
        ) : (
          '로딩 이미지'
        )}
        <div className="bottom">
          {/* TODO: item의 상세 이미지 Tab 컴포넌트에 같이 넘겨주기 */}
          <Tab />
        </div>
      </div>
      <Footer />
    </Container>
  );
}
