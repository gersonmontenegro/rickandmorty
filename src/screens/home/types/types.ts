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
  error: string;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  searchCharacters: (query: string, page: number) => void;
  searchEpisodes: (query: string, page: number) => void;
  searchLocations: (query: string, page: number) => void;
  totalPages: number;
}

export interface Pagination {
  nextPage: string;
  prevPage: string;
}