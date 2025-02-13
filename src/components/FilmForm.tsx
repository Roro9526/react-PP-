import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Film } from '../types';

interface FilmFormProps {
  onSubmit: (film: Omit<Film, 'id'>) => void;
  filmInitial?: Film;
  mode?: 'ajout' | 'modification';
}

export const FilmForm: React.FC<FilmFormProps> = ({
  onSubmit,
  filmInitial,
  mode = 'ajout',
}) => {
  const [titre, setTitre] = useState(filmInitial?.titre || '');
  const [note, setNote] = useState(filmInitial?.note || 1);
  const [commentaire, setCommentaire] = useState(filmInitial?.commentaire || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ titre, note, commentaire });
    if (mode === 'ajout') {
      setTitre('');
      setNote(1);
      setCommentaire('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-gray-700 mb-2">
          Titre du film *
        </label>
        <input
          type="text"
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          placeholder="Ex: Le Seigneur des Anneaux"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setNote(value)}
              className="group focus:outline-none transform hover:scale-110 transition-transform"
            >
              <Star
                className={`h-8 w-8 ${
                  value <= note ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 group-hover:text-yellow-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="commentaire" className="block text-sm font-medium text-gray-700 mb-2">
          Commentaire
        </label>
        <textarea
          id="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
          rows={4}
          placeholder="Vos impressions sur le film..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200"
      >
        {mode === 'ajout' ? 'Ajouter le film' : 'Modifier le film'}
      </button>
    </form>
  );
};