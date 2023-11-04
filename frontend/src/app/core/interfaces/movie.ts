export interface Movie {
  id: number;
  name: string;
  director: string;
  producer: string;
  rating: number;
  length: number;
}

export interface MovieDialogData extends Omit<Movie, "id"> {
  isEdit: boolean;
}
