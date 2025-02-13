import { useReducer, useEffect } from 'react';
import { Film } from '../types';

type FilmsState = {
  films: Film[];
  filtreNote: number | null;
  tri: 'titre' | 'note' | null;
};

type FilmsAction =
  | { type: 'AJOUTER_FILM'; payload: Film }
  | { type: 'MODIFIER_FILM'; payload: Film }
  | { type: 'SUPPRIMER_FILM'; payload: string }
  | { type: 'DEFINIR_FILTRE'; payload: number | null }
  | { type: 'DEFINIR_TRI'; payload: 'titre' | 'note' | null }
  | { type: 'CHARGER_FILMS'; payload: Film[] };

const filmsReducer = (state: FilmsState, action: FilmsAction): FilmsState => {
  let newState: FilmsState;
  
  switch (action.type) {
    case 'AJOUTER_FILM':
      newState = { ...state, films: [...state.films, action.payload] };
      break;
    case 'MODIFIER_FILM':
      newState = {
        ...state,
        films: state.films.map((film) =>
          film.id === action.payload.id ? action.payload : film
        ),
      };
      break;
    case 'SUPPRIMER_FILM':
      newState = {
        ...state,
        films: state.films.filter((film) => film.id !== action.payload),
      };
      break;
    case 'DEFINIR_FILTRE':
      newState = { ...state, filtreNote: action.payload };
      break;
    case 'DEFINIR_TRI':
      newState = { ...state, tri: action.payload };
      break;
    case 'CHARGER_FILMS':
      newState = { ...state, films: action.payload };
      break;
    default:
      return state;
  }

  localStorage.setItem('films', JSON.stringify(newState.films));
  return newState;
};

const initialState: FilmsState = {
  films: JSON.parse(localStorage.getItem('films') || '[]'),
  filtreNote: null,
  tri: null,
};

export const useFilms = () => {
  const [state, dispatch] = useReducer(filmsReducer, initialState);

  const filmsFiltres = state.films
    .filter((film) =>
      state.filtreNote ? film.note >= state.filtreNote : true
    )
    .sort((a, b) => {
      if (state.tri === 'titre') {
        return a.titre.localeCompare(b.titre);
      }
      if (state.tri === 'note') {
        return b.note - a.note;
      }
      return 0;
    });

  return {
    films: filmsFiltres,
    dispatch,
    filtreNote: state.filtreNote,
    tri: state.tri,
  };
};