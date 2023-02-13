import {useState} from 'react';
import {useQuery} from 'react-query';

import {isUndefined} from 'lodash';

import {Helpers} from '@utils/Helpers';

import {type UseListItemType} from '../types/types';

export const useListItem = (id: number, endpoint?: string): UseListItemType => {
  const [name, setName] = useState<string | undefined>('');
  useQuery([`firstSeen-${id}`], async () => {
    if (!isUndefined(endpoint)) {
      const url = `${endpoint}?rnd=${Math.random()}`;
      const firstSeenData = (await Helpers.fetchData(url)) as {name?: ''};
      setName(firstSeenData.name);
    }
  });

  return {
    firstSeen: name,
  };
};
