import React from 'react';
import { Star, Edit2, Trash2 } from 'lucide-react';
import { Film } from '../types';

interface FilmListProps {
  films: Film[];
  onModifier: (film: Film) => void;
  onSupprimer: (id: string) => void;
}

export const FilmList: React.FC<FilmListProps> = ({ films, onModifier, onSupprimer }) => {
  return (
    <div className="space-y-4">
      {films.map((film) => (
        <div
          key={film.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{film.titre}</h3>
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-5 w-5 ${
                      value <= film.note ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {film.commentaire && (
                <p className="mt-2 text-gray-600 bg-gray-50 p-3 rounded-lg italic">
                  "{film.commentaire}"
                </p>
              )}
            </div>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onModifier(film)}
                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                title="Modifier"
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onSupprimer(film.id)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Supprimer"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};