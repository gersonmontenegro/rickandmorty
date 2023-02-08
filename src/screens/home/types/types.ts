export interface useSearchWithPaginationProps {
  entity: string;
  query: string;
  page: string;
  pageSize: string;
}

export interface ResultsInfo {
  count: number;
  prev: string;
  next: string;
  pages: number;
}

export interface ResultItem {
  created: string;
  episode: [string];
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
}

export interface Results {
  info: ResultsInfo;
  results: ResultItem[];
}

export interface useSearchWithPaginationType {
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

export interface useListItemType {
  firstSeen: string;
}

export interface DetailsModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export interface DetailProps {
  title: string;
  description: string;
}
