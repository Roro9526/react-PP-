import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, Star, BookmarkCheck } from 'lucide-react';
import { FilmAPI } from '../types';
import { useWishlist } from '../hooks/useWishlist';

const API_KEY = '6685bbc84f9227028f5d51c72196e525'; // Remplacez par votre clé API TMDB
const API_URL = 'https://api.themoviedb.org/3';

export const Nouveautes: React.FC = () => {
  const [page, setPage] = useState(1);
  const [voirFavoris, setVoirFavoris] = useState(false);
  const { wishlist, ajouterAWishlist, retirerDeWishlist, estDansWishlist } = useWishlist();

  const { data, isLoading, error } = useQuery({
    queryKey: ['nouveautes', page],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&page=${page}`
      );
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;

  const filmsAffiches = voirFavoris
    ? data.results.filter((film: FilmAPI) => estDansWishlist(film.id))
    : data.results;

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setVoirFavoris(!voirFavoris)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            voirFavoris
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <BookmarkCheck className="h-5 w-5" />
          {voirFavoris ? 'Voir tous les films' : 'Voir mes favoris'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filmsAffiches.map((film: FilmAPI) => (
          <div key={film.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
              alt={film.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{film.title}</h3>
                <button
                  onClick={() =>
                    estDansWishlist(film.id)
                      ? retirerDeWishlist(film.id)
                      : ajouterAWishlist(film)
                  }
                  className="p-1"
                >
                  <Heart
                    className={`h-6 w-6 ${
                      estDansWishlist(film.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1">{film.vote_average.toFixed(1)}/10</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {film.overview}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Sortie le {new Date(film.release_date).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!voirFavoris && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
          >
            Page précédente
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Page suivante
          </button>
        </div>
      )}
    </div>
  );
};