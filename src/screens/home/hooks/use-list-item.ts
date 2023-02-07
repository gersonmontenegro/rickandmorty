import axios from 'axios';
import {useEffect, useState} from 'react';
import {type useListItemType} from '../types/types';

export const useListItem = (endpoint: string): useListItemType => {
  const [firstSeen, setFirstSeen] = useState<string>('');

  useEffect(() => {
    void axios
      .get(endpoint)
      .then(({data: {name}}) => {
        setFirstSeen(name as string);
      })
      .catch((queryError) => {
        console.log(queryError);
      });
  }, [endpoint]);

  return {
    firstSeen,
  };
};
