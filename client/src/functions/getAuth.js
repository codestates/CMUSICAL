import axios from 'axios';

export default async function getAuth(loginHandler, logoutHandler) {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_ADDR}/auth`)
    .then(data => {
      loginHandler();
      return true;
    })
    .catch(err => {
      logoutHandler();
      return false;
    });
}
