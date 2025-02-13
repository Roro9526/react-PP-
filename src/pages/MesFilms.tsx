import React, { useState } from 'react';
import { FilmForm } from '../components/FilmForm';
import { FilmList } from '../components/FilmList';
import { FilmFilters } from '../components/FilmFilters';
import { useFilms } from '../hooks/useFilms';
import { Film } from '../types';

export const MesFilms: React.FC = () => {
  const { films, dispatch, filtreNote, tri } = useFilms();
  const [filmAModifier, setFilmAModifier] = useState<Film | null>(null);

  const handleAjoutFilm = (nouveauFilm: Omit<Film, 'id'>) => {
    dispatch({
      type: 'AJOUTER_FILM',
      payload: { ...nouveauFilm, id: crypto.randomUUID() },
    });
  };

  const handleModificationFilm = (film: Film) => {
    dispatch({ type: 'MODIFIER_FILM', payload: film });
    setFilmAModifier(null);
  };

  const handleSuppressionFilm = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce film ?')) {
      dispatch({ type: 'SUPPRIMER_FILM', payload: id });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-8">
        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">
            {filmAModifier ? 'Modifier le film' : 'Ajouter un film'}
          </h2>
          <FilmForm
            onSubmit={
              filmAModifier
                ? (film) => handleModificationFilm({ ...film, id: filmAModifier.id })
                : handleAjoutFilm
            }
            filmInitial={filmAModifier}
            mode={filmAModifier ? 'modification' : 'ajout'}
          />
        </section>

        <section className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-indigo-700">Mes films</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <FilmFilters
              filtreNote={filtreNote}
              tri={tri}
              onFiltreChange={(note) =>
                dispatch({ type: 'DEFINIR_FILTRE', payload: note })
              }
              onTriChange={(tri) => dispatch({ type: 'DEFINIR_TRI', payload: tri })}
            />
          </div>
          <div className="mt-4">
            {films.length > 0 ? (
              <FilmList
                films={films}
                onModifier={setFilmAModifier}
                onSupprimer={handleSuppressionFilm}
              />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  Aucun film dans votre liste pour le moment
                </p>
                <p className="text-gray-400 mt-2">
                  Commencez par ajouter votre premier film !
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};