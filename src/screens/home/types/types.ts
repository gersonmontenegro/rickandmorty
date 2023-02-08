export interface ResultsInfo {
  count: number;
  prev: string;
  next: string;
  pages: number;
}

export interface ResultItem {
  created: string;
  episodes: [string];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
  air_date?: string;
  episode?: string;
  dimension?: string;
}

export interface Results {
  info: ResultsInfo;
  results: ResultItem[];
}

export interface UseSearchWithPaginationType {
  results: ResultItem[];
  loading: boolean;
  error: string | null;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  searchCharacters: (query: string) => void;
  searchEpisodes: (query: string) => void;
  searchLocations: (query: string) => void;
  totalPages: number;
  currentPage: number;
  locations: number;
  episodes: number;
  characters: number;
}

export interface Pagination {
  nextPage: string;
  prevPage: string;
}

export interface UseListItemType {
  firstSeen: string;
}

export interface DetailsModalProps {
  itemDetails: ResultItem | null;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export interface CardDetailsProps {
  itemDetails: ResultItem | null;
}

export interface DetailProps {
  title: string;
  description?: string;
}

export interface Colors {
  blackAbsolute: string;
  whiteAbsolute: string;

  whiteTransparent: string;

  primaryGray: string;
  secondaryGray: string;
  backgroundGray: string;
  secondaryBackgroundGray: string;

  activeBullet: string;
  inactiveBullet: string;

  shadowColor: string;

  whiteIcon: string;
}
