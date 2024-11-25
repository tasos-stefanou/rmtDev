import { useContext, useEffect, useState } from 'react';
import { SearchTextContext } from '../contexts/SearchTextContextProvider';
import { JobItem, JobItemExpanded } from './types';
import { BASE_API_URL, RESULTS_PER_PAGE } from './constants';

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

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${BASE_API_URL}${searchText ? '?search=' + searchText : ''}`
      );
      const data = await res.json();
      setJobItems(data.jobItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const jobItemsSliced = jobItems.slice(0, RESULTS_PER_PAGE);

  useEffect(() => {
    // if (!searchText) return;
    getData();
  }, [searchText]);

  const totalNumberOfResults = jobItems.length;

  return { jobItems: jobItemsSliced, isLoading, totalNumberOfResults };
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
  const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobItemData = async () => {
    if (!activeId) return;
    try {
      setIsLoading(true);
      const { jobItem } = await fetchJobItem(activeId);
      setJobItem(jobItem);
    } catch (error) {
      console.error('Error fetching job item data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobItemData();
  }, [activeId]);

  return { jobItem, isLoading };
};
