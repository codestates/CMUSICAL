import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Tab from '../components/Tab';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';

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
  const [test, setTest] = useState({});

  useEffect(() => {
    axios.get('https://localhost:4000/dummy/getitem').then((data) => {
      const info = data.data.dbs.db;
      setTest(info);
    });
  }, []);

  return (
    <Container>
      <Navigation />
      <div id="body">
        <div className="top">
          <div className="thumbnail">
            <Thumbnail poster={test.poster} title={test.prfnm} />
          </div>
          <div className="details">
            <span>{test.prfnm}</span>
            <span>{test.fcltynm}</span>
            <span>{test.pcseguidance}</span>
            <span>{test.prfcast}</span>
            <span>{test.prfruntime}</span>
            <span>{test.dtquidance}</span>
            <span>{test.prfpdfrom}</span>
            <span>{test.prfpdto}</span>
            <span>{test.prfstate}</span>
          </div>
        </div>
        <div className="bottom">
          <Tab images={test.styurls} />
        </div>
      </div>
      <Footer />
    </Container>
  );
}
