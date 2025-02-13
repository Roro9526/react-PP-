export interface Film {
  id: string;
  titre: string;
  note: number;
  commentaire?: string;
}

export interface FilmAPI {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface FilmWishlist extends FilmAPI {
  inWishlist: boolean;
}