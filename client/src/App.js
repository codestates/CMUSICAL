import React from 'react';
import { Routes, Route } from 'react-router-dom';
// ! react-router-dom 6.0 이상 버전에서 Switch가 Routes로 바뀜
// ! react-router-dom 6.0 이상 버전에선 useHistory가 useNavigate로 바뀜
import Main from './pages/Main';
import MyFavorites from './pages/MyFavorites';
import MyInfo from './pages/MyInfo';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MusicalInfo from './pages/MusicalInfo';

export default function APP() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/favorites" element={<MyFavorites />} />
      <Route path="/myinfo" element={<MyInfo />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/musicalinfo/:id" element={<MusicalInfo />} />
    </Routes>
  );
}
