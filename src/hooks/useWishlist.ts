import { useState, useEffect } from 'react';
import { FilmAPI } from '../types';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<FilmAPI[]>([]);

  useEffect(() => {
    const wishlistStockee = localStorage.getItem('wishlist');
    if (wishlistStockee) {
      setWishlist(JSON.parse(wishlistStockee));
    }
  }, []);

  const ajouterAWishlist = (film: FilmAPI) => {
    const nouvelleWishlist = [...wishlist, film];
    setWishlist(nouvelleWishlist);
    localStorage.setItem('wishlist', JSON.stringify(nouvelleWishlist));
  };

  const retirerDeWishlist = (filmId: number) => {
    const nouvelleWishlist = wishlist.filter((film) => film.id !== filmId);
    setWishlist(nouvelleWishlist);
    localStorage.setItem('wishlist', JSON.stringify(nouvelleWishlist));
  };

  const estDansWishlist = (filmId: number) => {
    return wishlist.some((film) => film.id === filmId);
  };

  return {
    wishlist,
    ajouterAWishlist,
    retirerDeWishlist,
    estDansWishlist,
  };
};