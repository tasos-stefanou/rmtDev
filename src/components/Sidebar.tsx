import { JobItem } from '../lib/types';
import JobList from './JobList';
import Pagination from './PaginationControls';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';

type SidebarProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
};

export default function Sidebar({
  jobItems,
  isLoading,
  totalNumberOfResults,
}: SidebarProps) {
  return (
    <div className='sidebar'>
      <div className='sidebar__top'>
        <ResultsCount count={totalNumberOfResults} />
        <SortingControls />
      </div>
      <JobList jobItems={jobItems} isLoading={isLoading} />
      <Pagination />
    </div>
  );
}
