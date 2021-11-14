import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// ! react-router-dom 6.0 이상 버전에서 Switch가 Routes로 바뀜
// ! react-router-dom 6.0 이상 버전에선 useHistory가 useNavigate로 바뀜
import Main from './pages/Main';
import MyFavorites from './pages/MyFavorites';
import MyInfo from './pages/MyInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MusicalInfo from './pages/MusicalInfo';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function APP() {
  const [favoList, setFavoList] = useState([]);

  const favoritesHandler = (id) => {
    // ! Thumbnail의 별모양을 눌렀을 때 해당 뮤지컬 정보를 받아옴 (info)
    // ! favoList에 info가 존재하는지 확인 -> 좀 더 괜찮은 로직이 있는지 찾아보기
    // ! 다시하자^^ for문 말도 안되는 것 ^^
    // favoList에 같은 id가 존재하면 delete 요청, 없으면 post 요청
    for (let i = 0; i < favoList.length + 1; i++) {
      if (favoList[i].id === id) {
        axios.delete('https://localhost:4000/favorites', { itemId: id }).then((data) => {
          console.log('즐겨찾기에서 삭제됐습니다!');
        });
      } else {
        axios.post('https://localhost:4000/favorites', { itemId: id }).then((data) => {
          console.log('즐겨찾기에 추가됐습니다!');
        });
      }
    }
  };

  useEffect(() => {
    axios.get(' https://localhost:4000/favorites').then((data) => {
      // console.log(data);
      // setFavoList(...favoList, data);
    });
  }, [favoList]);

  return (
    <Routes>
      <Route path="/" element={<Main favoritesHandler={favoritesHandler} />} />
      <Route path="/favorites" element={<MyFavorites favoritesHandler={favoritesHandler} favoList={favoList} />} />
      <Route path="/myinfo" element={<MyInfo />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/musicalinfo/:id" element={<MusicalInfo />} />
    </Routes>
  );
}
