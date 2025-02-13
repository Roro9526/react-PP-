import React from 'react';
import { Star } from 'lucide-react';

interface FilmFiltersProps {
  filtreNote: number | null;
  tri: 'titre' | 'note' | null;
  onFiltreChange: (note: number | null) => void;
  onTriChange: (tri: 'titre' | 'note' | null) => void;
}

export const FilmFilters: React.FC<FilmFiltersProps> = ({
  filtreNote,
  tri,
  onFiltreChange,
  onTriChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par note minimum
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onFiltreChange(filtreNote === value ? null : value)}
              className="group focus:outline-none transform hover:scale-110 transition-transform"
            >
              <Star
                className={`h-7 w-7 ${
                  (filtreNote !== null && value <= filtreNote)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 group-hover:text-yellow-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Trier par
        </label>
        <select
          value={tri || ''}
          onChange={(e) => onTriChange(e.target.value as 'titre' | 'note' | null)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        >
          <option value="">Aucun tri</option>
          <option value="titre">Titre</option>
          <option value="note">Note</option>
        </select>
      </div>
    </div>
  );
};