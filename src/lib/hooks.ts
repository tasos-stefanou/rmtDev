import { useContext, useEffect, useState } from 'react';
import { SearchTextContext } from '../contexts/SearchTextContextProvider';
import { JobItem, JobItemExpanded } from './types';
import { BASE_API_URL } from './constants';
import { useQuery } from '@tanstack/react-query';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error(
      'useSearchTextContext must be used within a SearchTextContextProvider'
    );
  }
  return context;
}

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(
    `${BASE_API_URL}${searchText ? '?search=' + searchText : ''}`
  );
  // 4xx or 5xx
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export function useJobItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ['job-items', searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      // It is enabled true so it will fetch the data when the component mounts
      enabled: true,
      onError: (error) => {
        console.error(
          `Error fetching job items based on search text ${searchText}:`,
          error
        );
      },
    }
  );

  return {
    jobItems: data?.jobItems ?? [],
    isLoading: isInitialLoading,
  } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return { activeId };
}

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

export const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  // 4xx or 5xx
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }

  const data = await response.json();
  return data;
};

export const useJobItem = (activeId: number | null) => {
  const { data, isInitialLoading } = useQuery(
    ['job-item', activeId],
    () => (activeId ? fetchJobItem(activeId) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(activeId),
      onError: (error) => {
        console.error('Error fetching job item:', error);
      },
    }
  );

  return {
    jobItem: data?.jobItem,
    isLoading: isInitialLoading,
  } as const;
};
