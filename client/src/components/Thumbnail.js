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

    > .pick {
      width: 50px;
      min-height: 50px;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
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
        <div className="pick" onClick={handleFavorites}>
          {isLogin ? (
            favorite ? (
              !icon ? (
                <MdBookmarkAdd size="3.5rem" color="yellow" onMouseOver={onIcon} />
              ) : (
                <MdOutlineBookmarkAdd size="3.5rem" color="yellow" onMouseLeave={offIcon} />
              )
            ) : icon ? (
              <MdBookmarkAdd size="3.5rem" color="yellow" onMouseLeave={offIcon} />
            ) : (
              <MdOutlineBookmarkAdd size="3.5rem" color="yellow" onMouseOver={onIcon} />
            )
          ) : (
            ''
          )}
        </div>
      </div>
    </Box>
  );
}
