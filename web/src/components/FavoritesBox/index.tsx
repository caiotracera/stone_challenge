import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaHeart, FiHeart } from 'react-icons/all';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import {
  Container,
  ComicsContainer,
  Comic,
  FavContainer,
  Content,
  PaginationContainer,
} from './styles';

type IFavoriteData = {
  id: string;
  favorite_id: number;
};

const FavoritesBox: React.FC = () => {
  return (
    <div>
      <h1>hello world</h1>
    </div>
  );
};

export default FavoritesBox;
