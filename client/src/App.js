import React, { useState } from 'react';
import { Navigation } from './components/Navigation';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      <div id="container">
        <div id="header">
          <Navigation isLogin={isLogin} loginHandler={loginHandler} />
        </div>
      </div>
    </>
  );
};

export default App;
