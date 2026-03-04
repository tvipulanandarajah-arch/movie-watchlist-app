export interface Movie {
  id: string;
  _id?: string;
  title: string;
  poster: string;
  rating: number;
  watched: boolean;
  year: string;
  type: string;
  watchedDate?: string;
}