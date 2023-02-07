/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Helpers} from '../../../utils/Helpers';
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
  const [searchResults, setSearchResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({nextPage: '', prevPage: ''});
  const [totalPages, setTotalPages] = useState<number>(0);
  const [entity, setEntity] = useState<string>('characters');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [locations, setLocations] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [episodes, setEpisodes] = useState<number>(0);

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

  const setNewCurrentPage = (prevPage: number, nextPage: number): void => {
    if (prevPage === 0 && nextPage === 0) {
      setCurrentPage(1);
    } else if (prevPage === 0 || isNaN(prevPage)) {
      setCurrentPage(1);
    } else if (nextPage === 0 || isNaN(nextPage)) {
      setCurrentPage(prevPage + 1);
    } else if (prevPage > 0 && nextPage > 0) {
      setCurrentPage(prevPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    const endpoint = `https://rickandmortyapi.com/api/${entity}/?name=${query}&page=${page}`;

    void axios
      .get(endpoint)
      .then((response) => {
        const results = response.data as Results;
        setSearchResults(results.results);
        setNewCurrentPage(
          Number(Helpers.getURLParams(results.info.prev).page) ?? 0,
          Number(Helpers.getURLParams(results.info.next).page) ?? 0,
        );
        setPagination({
          nextPage: results.info.next,
          prevPage: results.info.prev,
        });
        setTotalPages(results.info.pages);
        setLoading(false);
      })
      .catch((queryError) => {
        setError(queryError as string);
        setLoading(false);
      });
  }, [entity, page, query]);

  const handleNextPage = (): void => {
    const pageToGo = Helpers.getURLParams(pagination.nextPage).page;
    if (pageToGo !== '') {
      setPage(pageToGo);
    }
  };

  const handlePrevPage = (): void => {
    const pageToGo = Helpers.getURLParams(pagination.prevPage).page;
    if (pageToGo !== '') {
      setPage(pageToGo);
    }
  };

  const searchCharacters = (queryParameter: string): void => {
    setEntity('character');
    setQuery(queryParameter);
    setPage('0');
  };

  const searchEpisodes = (queryParameter: string): void => {
    setEntity('episode');
    setQuery(queryParameter);
    setPage('0');
  };

  const searchLocations = (queryParameter: string): void => {
    setEntity('location');
    setQuery(queryParameter);
    setPage('0');
  };

  return {
    results: searchResults,
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
