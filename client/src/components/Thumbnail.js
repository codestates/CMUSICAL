import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdBookmarkAdd } from 'react-icons/md';
import { MdOutlineBookmarkAdd } from 'react-icons/md';
import axios from 'axios';

export const Box = styled.div`
  width: 300px;
  min-height: auto;

  > .thumbnail {
    width: auto;
    position: relative;
    margin: 1rem 0;
    box-shadow: 0 5px 5px #bfa5a3;
    outline: none;
    border: none;
    border-radius: 20px;
  }
`;

export const Pick = styled.div`
  width: 50px;
  min-height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  background-color: white;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);

  .icon {
    width: 3.2rem;
    height: 3.2rem;
    color: #bfa5a3;
  }

  .on {
    color: #bfa5a3;
    opacity: 0.7;
  }
`;

export const Img = styled.img.attrs({})`
  width: 100%;
  height: 25rem;
  outline: none;
  border: none;
  border-radius: 20px;
`;

export default function Thumbnail({ isLogin, thumbnail, title, id, favorites, setFavorites }) {
  const [icon, setIcon] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // * 즐겨찾기 여부 확인
  useEffect(() => {
    const isFavorited = favorites.reduce((acc, cur) => {
      if (cur.id === id) acc = true;
      return acc;
    }, false);
    setFavorite(isFavorited);
  }, [favorites, favorite]);

  const handleFavorites = async () => {
    if (favorite) {
      await axios
        .delete(`${process.env.REACT_APP_SERVER_ADDR}/favorites?itemId=${id}`) //
        .then((data) => {
          setFavorite(false);
        })
        .then(async (data) => {
          const favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
          setFavorites(favoritesList.data.items);
        })
        .catch(console.log);
    } else {
      await axios
        .post(`${process.env.REACT_APP_SERVER_ADDR}/favorites?itemId=${id}`) //
        .then((data) => {
          setFavorite(false);
        })
        .then(async (data) => {
          const favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
          setFavorites(favoritesList.data.items);
        })
        .catch(console.log);
    }
  };

  const onIcon = () => {
    setIcon(true);
  };

  const offIcon = () => {
    setIcon(false);
  };

  return (
    <Box>
      <div className="thumbnail">
        <Link to={`/musicalinfo/${id}`}>
          <Img src={thumbnail} alt={title} />
        </Link>
        <div>
          {isLogin ? (
            <Pick onClick={handleFavorites}>
              {favorite ? (
                !icon ? (
                  <MdBookmarkAdd className="icon on" onMouseOver={onIcon} />
                ) : (
                  <MdOutlineBookmarkAdd className="icon" onMouseLeave={offIcon} />
                )
              ) : icon ? (
                <MdBookmarkAdd className="icon" onMouseLeave={offIcon} />
              ) : (
                <MdOutlineBookmarkAdd className="icon on" onMouseOver={onIcon} />
              )}
            </Pick>
          ) : (
            ''
          )}
        </div>
      </div>
    </Box>
  );
}
