/* eslint-disable @typescript-eslint/no-unsafe-return */
import {useState, useEffect} from 'react';
import {
  type Pagination,
  type ResultItem,
  type Results,
  type useSearchWithPaginationType,
} from '../types/types';

const LOCATIONS_URL = 'https://rickandmortyapi.com/api/location';
const EPISODES_URL = 'https://rickandmortyapi.com/api/episode';
const CHARACTERS_URL = 'https://rickandmortyapi.com/api/character';

const useSearchWithPagination = (): useSearchWithPaginationType => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({nextPage: '', prevPage: ''});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [entity, setEntity] = useState<string>('characters');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [locations, setLocations] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [episodes, setEpisodes] = useState<number>(0);

  const getLastNumber = (url: string): string => {
    if (url === null) {
      return '';
    }
    const regex = /\d+$/;
    const result = url.match(regex);
    if (result !== null) {
      return result[0];
    } else {
      return '';
    }
  };

  useEffect(() => {
    fetch(LOCATIONS_URL)
      .then(async (res) => await res.json())
      .then((data: Results) => {
        setLocations(data.info.count);
      })
      .catch((errorMessage) => {
        setError(errorMessage as string);
      });

    fetch(EPISODES_URL)
      .then(async (res) => await res.json())
      .then((data: Results) => {
        setEpisodes(data.info.count);
      })
      .catch((errorMessage) => {
        setError(errorMessage as string);
      });

    fetch(CHARACTERS_URL)
      .then(async (res) => await res.json())
      .then((data: Results) => {
        setCharacters(data.info.count);
      })
      .catch((errorMessage) => {
        setError(errorMessage as string);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    let endpoint;
    switch (entity) {
      case 'characters':
        endpoint = `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`;
        break;
      case 'episodes':
        endpoint = `https://rickandmortyapi.com/api/episode/?name=${query}&page=${page}`;
        break;
      case 'locations':
        endpoint = `https://rickandmortyapi.com/api/location/?name=${query}&page=${page}`;
        break;
      default:
        endpoint = `https://rickandmortyapi.com/api/character/?name=${query}&page=${page}`;
    }

    const setNewCurrentPage = (prevPage: number): void => {
      setCurrentPage(prevPage + 1);
    };

    fetch(endpoint)
      .then(async (res) => await res.json())
      .then((data: Results) => {
        setResults(data.results);
        const prevPage = getLastNumber(data.info.prev);
        setNewCurrentPage(Number(prevPage));
        setPagination({
          nextPage: data.info.next,
          prevPage: data.info.prev,
        });
        setTotalPages(data.info.pages);
        // setTotalPages(Math.ceil(data.info.count / pageSize));
        setLoading(false);
      })
      .catch((queryError) => {
        setError(queryError as string);
        setLoading(false);
      });
  }, [entity, page, pageSize, query]);

  const handleNextPage = (): void => {
    const pageToGo = getLastNumber(pagination.nextPage);
    if (pageToGo !== '') {
      setPage(pageToGo);
    }
  };

  const handlePrevPage = (): void => {
    const pageToGo = getLastNumber(pagination.prevPage);
    if (pageToGo !== '') {
      console.log('go to', pageToGo);
      setPage(pageToGo);
    }
  };

  const searchCharacters = (queryParameter: string, page) => {
    setEntity('characters');
    setQuery(queryParameter);
    setPage(page);
  };

  const searchEpisodes = (queryParameter: string, page) => {
    setEntity('episodes');
    setQuery(queryParameter);
    setPage(page);
  };

  const searchLocations = (query, page) => {
    setEntity('locations');
    setQuery(query);
    setPage(page);
  };

  return {
    results,
    loading,
    error,
    handleNextPage,
    handlePrevPage,
    searchCharacters,
    searchEpisodes,
    searchLocations,
    totalPages,
    currentPage,
    locations,
    episodes,
    characters,
  };
};

export {useSearchWithPagination};
